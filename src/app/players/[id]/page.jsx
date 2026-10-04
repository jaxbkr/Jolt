// Read server environment at request time; explicit API fetch caches still apply.
export const runtime = "nodejs";
export const revalidate = 0;

import Link from "next/link";
import fetchPlayerStatisticById from "../../utils/fetchPlayerStatisticById";
import { seasonContext } from "../../utils/api";
import {
  DataUnavailable,
  Empty,
  Logo,
  PageHeading,
  SeasonSelect,
} from "../../components/DataUI";
export default async function Page({ params, searchParams }) {
  let context, stats;
  try {
    context = await seasonContext(searchParams.season);
    stats = await fetchPlayerStatisticById(params.id, context.season);
  } catch {
    return <DataUnavailable />;
  }
  const { player = {}, teams = [] } = stats[0] || {};
  return (
    <div className="page">
      <Link className="back-link" href={`/teams?season=${context.season}`}>
        ← Explore teams
      </Link>
      <PageHeading
        eyebrow={`${context.season} / PLAYER PROFILE`}
        title={player.name || "Player statistics"}
        description="Season performance, one stat at a time."
      >
        <SeasonSelect {...context} />
      </PageHeading>
      {player.image && (
        <div className="panel profile-heading">
          <Logo src={player.image} name={player.name} />
          <strong>{player.name}</strong>
        </div>
      )}
      {teams.length ? (
        teams.map((team, index) => (
          <section key={team.team?.id || index}>
            <div className="section-heading">
              <h2>{team.team?.name || "Season stats"}</h2>
            </div>
            <div className="data-grid">
              {team.groups?.map((group, i) => (
                <div className="panel" key={i}>
                  <h2>{group.name}</h2>
                  <ul className="stat-list">
                    {group.statistics?.map((stat, j) => (
                      <li key={j}>
                        <span>{stat.name?.replace(/_/g, " ")}</span>
                        <strong>{stat.value ?? "—"}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))
      ) : (
        <Empty title="Player statistics not available" />
      )}
    </div>
  );
}
