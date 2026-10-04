import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {test} from 'node:test';
const source=(await readFile(new URL('../src/app/utils/api.js',import.meta.url),'utf8')).replace('import "server-only";','').replaceAll('export async function','async function');
function client(data,{key='fixture-only',ok=true}={}) {
 const calls=[];
 const logs=[];
 const context=vm.createContext({console:{error:(message)=>logs.push(message)},URLSearchParams,AbortSignal,process:{env:{API_KEY:key}},fetch:async(url,options)=>{calls.push({url,options});return {ok,json:async()=>data};}});
 vm.runInContext(source,context);
 return {api:context.api,seasonContext:context.seasonContext,calls,logs};
}
test('current season wins over newer announced year and historical selection persists',async()=>{
 const c=client({response:[{seasons:[{year:2027,current:false},{year:2026,current:true},{year:2023,current:false}]}]});
 assert.equal((await c.seasonContext()).season,2026);
 assert.equal((await c.seasonContext('2023')).season,2023);
 await assert.rejects(c.seasonContext('1999'),/not available/);
 assert.equal(c.calls[0].options.next.revalidate,86400);
});
test('offseason falls back to latest returned season, not calendar year',async()=>{
 const c=client({response:[{seasons:[{year:2025,current:false},{year:2023,current:false}]}]});
 assert.equal((await c.seasonContext()).season,2025);
});
test('HTTP-200 provider errors do not masquerade as empty results',async()=>{
 await assert.rejects(client({errors:{requests:'quota reached'},response:[]}).api('games'),/provider/);
 await assert.rejects(client({errors:['denied'],response:[]}).api('games'),/provider/);
 await assert.rejects(client({response:{}}).api('games'),/provider/);
});
test('empty data is valid; HTTP failures and missing keys are separate failures',async()=>{
 assert.equal((await client({response:[]}).api('games')).length,0);
 await assert.rejects(client({}, {ok:false}).api('games'),/unavailable/);
 const c=client({}, {key:''});await assert.rejects(c.api('games'),/not connected/);assert.equal(c.calls.length,0);
});
test('uses direct-provider authentication and encodes filters',async()=>{
 const c=client({response:[]});await c.api('players',{season:2025,team:'a&b'});
 assert.equal(c.calls[0].options.headers['x-apisports-key'],'fixture-only');
 assert.match(c.calls[0].url,/team=a%26b/);
 assert.equal(c.calls[0].options.next.revalidate,900);
});

test('trims Vercel key whitespace and rejects whitespace-only configuration',async()=>{
 const c=client({response:[]},{key:'  fixture-only\n'});await c.api('teams');
 assert.equal(c.calls[0].options.headers['x-apisports-key'],'fixture-only');
 const missing=client({}, {key:' \n'});await assert.rejects(missing.api('teams'),/not connected/);
 assert.equal(missing.calls.length,0);assert.match(missing.logs[0],/API_KEY is missing/);
});
test('diagnostics identify provider failures without exposing response text or key',async()=>{
 const c=client({errors:{token:'secret-value'},response:[]},{key:'secret-value'});
 await assert.rejects(c.api('teams'),/provider/);
 assert.match(c.logs[0],/authentication/);
 assert.ok(!c.logs.join('').includes('secret-value'));
});
