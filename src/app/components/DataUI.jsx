import Link from "next/link";
export function SeasonSelect({ season, seasons }) {
  return (
    <form className="season-form">
      <label htmlFor="season">Season</label>
      <select id="season" name="season" defaultValue={season}>
        {seasons.map((s) => (
          <option key={s.year} value={s.year}>
            {s.year}
            {s.current ? " · Current" : ""}
          </option>
        ))}
      </select>
      <button className="button secondary" type="submit">
        Apply
      </button>
    </form>
  );
}
export function PageHeading({ eyebrow, title, description, children }) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="muted">{description}</p>
      </div>
      {children}
    </div>
  );
}
export function Empty({ title = "No data for this season", children }) {
  return (
    <div className="empty-state">
      <span className="empty-symbol">ϟ</span>
      <h2>{title}</h2>
      <p>
        {children || "Try another season. Coverage can vary by team and year."}
      </p>
    </div>
  );
}
export function DataUnavailable() {
  return (
    <div className="page">
      <Empty title="Stats are taking a timeout">
        Football data is unavailable right now. Please try again later.
      </Empty>
      <Link className="button secondary" href="/">
        Back to overview
      </Link>
    </div>
  );
}
export function Logo({ src, name }) {
  return src ? (
    <img className="team-logo" src={src} alt="" loading="lazy" />
  ) : (
    <span className="logo-fallback" aria-hidden="true">
      {name?.slice(0, 2) || "—"}
    </span>
  );
}
