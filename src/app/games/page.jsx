// Read server environment at request time; explicit API fetch caches still apply.
export const runtime = "nodejs";
export const revalidate = 0;

import { fetchGamesBySeason } from "../utils/fetchGamesBySeason";
import { seasonContext } from "../utils/api";
import {
  DataUnavailable,
  PageHeading,
  SeasonSelect,
} from "../components/DataUI";
import Explorer from "../components/Explorer";
export default async function Page({ searchParams }) {
  let context, games;
  try {
    context = await seasonContext(searchParams.season);
    games = await fetchGamesBySeason(context.season);
  } catch {
    return <DataUnavailable />;
  }
  games.sort(
    (a, b) => (b.game.date?.timestamp || 0) - (a.game.date?.timestamp || 0),
  );
  return (
    <div className="page">
      <PageHeading
        eyebrow="THE MATCHUP"
        title="Every game. Every angle."
        description="Explore the schedule, final scores, and game statistics. Times shown in UTC."
      >
        <SeasonSelect {...context} />
      </PageHeading>
      <Explorer items={games} kind="games" season={context.season} />
    </div>
  );
}
