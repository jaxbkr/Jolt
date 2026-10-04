import Link from "next/link";
export default function NotFound() {
  return (
    <div className="page">
      <div className="empty-state">
        <h1>That play is out of bounds.</h1>
        <p>We couldn’t find that team or game.</p>
        <Link className="button primary" href="/">
          Back to overview
        </Link>
      </div>
    </div>
  );
}
