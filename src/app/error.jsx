"use client";
export default function Error({ reset }) {
  return (
    <div className="page empty-state">
      <h1>Stats are taking a timeout.</h1>
      <p>We couldn’t load this page. Please try again.</p>
      <button className="button primary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
