export default function Loading() {
  return (
    <div className="page" role="status">
      <p className="eyebrow">GETTING THE PLAYBOOK</p>
      <h1>Loading stats…</h1>
      <div className="skeleton-grid" aria-hidden="true">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div className="skeleton" key={n} />
        ))}
      </div>
    </div>
  );
}
