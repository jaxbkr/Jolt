// Read server environment at request time; explicit API fetch caches still apply.
export const runtime = "nodejs";
export const revalidate = 0;

import Link from "next/link";
import { notFound } from "next/navigation";
import fetchTeamById from "../../utils/fetchTeamById";
import fetchPlayersByTeam from "../../utils/fetchPlayersByTeam";
import { seasonContext } from "../../utils/api";
import {
  DataUnavailable,
  Empty,
  Logo,
  PageHeading,
  SeasonSelect,
} from "../../components/DataUI";
export default async function Page({ params, searchParams }) {
  let context, team, players;
  try {
    context = await seasonContext(searchParams.season);
    const data = await fetchTeamById(params.id);
    team = data[0];
    players = await fetchPlayersByTeam(params.id, context.season);
  } catch {
    return <DataUnavailable />;
  }
  if (!team) notFound();
  return (
    <div className="page">
      <Link className="back-link" href={`/teams?season=${context.season}`}>
        ← All teams
      </Link>
      <PageHeading
        eyebrow={`${context.season} / TEAM PROFILE`}
        title={team.name}
        description={[team.city, team.country?.name].filter(Boolean).join(", ")}
      >
        <SeasonSelect {...context} />
      </PageHeading>
      <section className="panel profile-heading">
        <Logo src={team.logo} name={team.name} />
        <dl className="details-grid">
          {[
            ["Coach", team.coach],
            ["Stadium", team.stadium],
            ["Established", team.established],
          ].map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{value ?? "Not available"}</dd>
            </div>
          ))}
        </dl>
      </section>
      <div className="section-heading">
        <h2>The roster</h2>
        <span className="muted">
          {players.length} players · {context.season}
        </span>
      </div>
      {players.length ? (
        <div className="data-grid">
          {players.map((player) => (
            <Link
              className="data-card"
              key={player.id}
              href={`/players/${player.id}?season=${context.season}`}
            >
              <div className="profile-heading">
                <Logo src={player.image} name={player.name} />
                <div>
                  <h2>{player.name}</h2>
                  <p className="muted">
                    {player.position || "Player"}{" "}
                    {player.number != null ? `· #${player.number}` : ""}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Empty title="Roster not available" />
      )}
    </div>
  );
}
