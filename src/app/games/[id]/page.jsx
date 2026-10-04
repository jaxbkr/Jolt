import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchGameById } from "../../utils/fetchGameById";
import { fetchTeamStatistics } from "../../utils/fetchTeamStatistics";
import { DataUnavailable, Empty, PageHeading } from "../../components/DataUI";
export default async function Page({ params }) {
  let game, stats;
  try {
    game = (await fetchGameById(params.id))[0];
  } catch {
    return <DataUnavailable />;
  }
  if (!game) notFound();
  try {
    stats = await fetchTeamStatistics(params.id);
  } catch {
    stats = null;
  }
  const season = game.league?.season;
  const columns = [
    ["Q1", "quarter_1"],
    ["Q2", "quarter_2"],
    ["Q3", "quarter_3"],
    ["Q4", "quarter_4"],
    ["OT", "overtime"],
    ["Total", "total"],
  ];
  return (
    <div className="page">
      <Link
        className="back-link"
        href={season ? `/games?season=${season}` : "/games"}
      >
        ← All games
      </Link>
      <PageHeading
        eyebrow={`${season || "NFL"} / ${game.game.week || "GAME STATS"}`}
        title={`${game.teams.away.name} at ${game.teams.home.name}`}
        description={`${game.game.status?.long || "Scheduled"} · ${game.game.date?.date || "Date TBD"} ${game.game.date?.time || ""} UTC`}
      />
      <section className="panel table-scroll">
        <table>
          <caption className="sr-only">Quarter by quarter scores</caption>
          <thead>
            <tr>
              <th scope="col">Team</th>
              {columns.map(([label]) => (
                <th scope="col" key={label}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {["away", "home"].map((side) => (
              <tr key={side}>
                <th scope="row">{game.teams[side].name}</th>
                {columns.map(([label, key]) => (
                  <td key={key}>
                    {key === "total" ? (
                      <strong>{game.scores[side]?.[key] ?? "—"}</strong>
                    ) : (
                      (game.scores[side]?.[key] ?? "—")
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div className="section-heading">
        <h2>Inside the numbers</h2>
      </div>
      {stats?.length ? (
        <div className="feature-grid">
          {stats.map((entry, index) => (
            <section className="panel" key={entry.team?.id || index}>
              <h2>{entry.team?.name}</h2>
              <ul className="stat-list">
                {[
                  ["Total yards", entry.statistics?.yards?.total],
                  ["Passing yards", entry.statistics?.passing?.total],
                  ["Rushing yards", entry.statistics?.rushings?.total],
                  ["First downs", entry.statistics?.first_downs?.total],
                  [
                    "Third down efficiency",
                    entry.statistics?.first_downs?.third_down_efficiency,
                  ],
                  ["Turnovers", entry.statistics?.turnovers?.total],
                ].map(([label, value]) => (
                  <li key={label}>
                    <span>{label}</span>
                    <strong>{value ?? "—"}</strong>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <Empty
          title={
            stats === null
              ? "Team stats are temporarily unavailable"
              : "Team stats are not available yet"
          }
        >
          Scores remain available above. Detailed statistics depend on game
          status and provider coverage.
        </Empty>
      )}
    </div>
  );
}
