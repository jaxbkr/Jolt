"use client";
import { useState } from "react";
import Link from "next/link";
import { Empty, Logo } from "./DataUI";
export default function Explorer({ items, kind, season }) {
  const [query, setQuery] = useState("");
  const [week, setWeek] = useState("");
  const games = kind === "games";
  const weeks = [...new Set(items.map((i) => i.game?.week).filter(Boolean))];
  const filtered = items.filter(
    (i) =>
      (games ? `${i.teams?.home?.name} ${i.teams?.away?.name}` : i.name || "")
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (!week || i.game?.week === week),
  );
  return (
    <>
      <div className="toolbar">
        <label className="sr-only" htmlFor="search">
          Search teams
        </label>
        <input
          id="search"
          type="search"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={games ? "Search matchups by team…" : "Find a team…"}
        />
        {games && (
          <>
            <label className="sr-only" htmlFor="week">
              Filter week
            </label>
            <select
              id="week"
              className="filter-select"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
            >
              <option value="">All weeks</option>
              {weeks.map((w) => (
                <option key={w}>{w}</option>
              ))}
            </select>
          </>
        )}
      </div>
      <p className="results-count" aria-live="polite">
        {filtered.length} {kind} · {season} season
      </p>
      {filtered.length ? (
        <div className="data-grid">
          {filtered.map((item) =>
            games ? (
              <GameCard key={item.game.id} game={item} season={season} />
            ) : (
              <Link
                key={item.id}
                className="data-card team-card"
                href={`/teams/${item.id}?season=${season}`}
              >
                <div className="card-top">
                  <span>{item.code || "NFL"}</span>
                  <span>↗</span>
                </div>
                <Logo src={item.logo} name={item.name} />
                <h2>{item.name}</h2>
                <p>{item.city || "NFL"} · View roster</p>
              </Link>
            ),
          )}
        </div>
      ) : (
        <Empty
          title={items.length ? "No matches found" : "No data for this season"}
        >
          {items.length
            ? "Try another team name or clear your filters."
            : undefined}
        </Empty>
      )}
    </>
  );
}
function GameCard({ game, season }) {
  const finished = ["FT", "AOT"].includes(game.game.status?.short);
  return (
    <Link
      className="data-card"
      href={`/games/${game.game.id}?season=${season}`}
    >
      <div className="card-top">
        <span>{game.game.week || game.game.stage}</span>
        <span>{game.game.status?.long || "Scheduled"}</span>
      </div>
      {["away", "home"].map((side) => (
        <div className="score-row" key={side}>
          <Logo src={game.teams[side]?.logo} name={game.teams[side]?.name} />
          <span>{game.teams[side]?.name || "TBD"}</span>
          <strong
            className={
              finished &&
              game.scores[side]?.total >
                game.scores[side === "home" ? "away" : "home"]?.total
                ? "winner"
                : ""
            }
          >
            {game.scores[side]?.total ?? "—"}
          </strong>
        </div>
      ))}
      <p className="game-date">
        {game.game.date?.date} · {game.game.date?.time} UTC{" "}
        <span aria-hidden="true">↗</span>
      </p>
    </Link>
  );
}
