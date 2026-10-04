import "server-only";
const BASE = "https://v1.american-football.api-sports.io";
export async function api(path, params = {}, revalidate = 900) {
  const key = process.env.API_KEY?.trim();
  if (!key) {
    console.error("[Jolt API] API_KEY is missing from the server environment.");
    throw new Error("Football data is not connected yet.");
  }
  const response = await fetch(
    `${BASE}/${path}?${new URLSearchParams(params)}`,
    {
      headers: { "x-apisports-key": key },
      next: { revalidate },
      signal: AbortSignal.timeout(12000),
    },
  );
  if (!response.ok) {
    console.error(`[Jolt API] Provider HTTP status: ${response.status}`);
    throw new Error("Football data is temporarily unavailable.");
  }
  const data = await response.json();
  if (Object.keys(data.errors || {}).length || !Array.isArray(data.response)) {
    // Log only fixed categories, never the key or provider error text.
    const category = data.errors?.token ? "authentication" :
      data.errors?.requests ? "quota" : data.errors?.plan ? "plan" : "response";
    console.error(`[Jolt API] Provider rejected request: ${category}`);
    throw new Error("The data provider could not return this request.");
  }
  return data.response;
}
export async function seasonContext(requested) {
  const leagues = await api("leagues", { id: 1 }, 86400);
  const seasons = (leagues[0]?.seasons || [])
    .filter((s) => Number.isInteger(s.year))
    .sort((a, b) => b.year - a.year);
  if (!seasons.length) throw new Error("No NFL seasons are available.");
  const selected =
    requested === undefined
      ? seasons.find((s) => s.current) || seasons[0]
      : seasons.find((s) => String(s.year) === requested);
  if (!selected)
    throw new Error(
      "This season is not available. Choose a season from Teams or Games.",
    );
  return { season: selected.year, seasons, coverage: selected.coverage };
}
