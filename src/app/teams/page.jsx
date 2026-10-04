// Read server environment at request time; explicit API fetch caches still apply.
export const runtime = "nodejs";
export const revalidate = 0;

import { fetchTeams } from "../utils/fetchTeams";
import { seasonContext } from "../utils/api";
import {
  DataUnavailable,
  PageHeading,
  SeasonSelect,
} from "../components/DataUI";
import Explorer from "../components/Explorer";
export default async function Page({ searchParams }) {
  let context, teams;
  try {
    context = await seasonContext(searchParams.season);
    teams = await fetchTeams(context.season);
  } catch {
    return <DataUnavailable />;
  }
  return (
    <div className="page">
      <PageHeading
        eyebrow="THE ROSTER"
        title="Find your side."
        description="Explore the franchises and the players behind every play."
      >
        <SeasonSelect {...context} />
      </PageHeading>
      <Explorer items={teams} kind="teams" season={context.season} />
    </div>
  );
}
