import Link from "next/link";
export default function Home() {
  return (
    <div className="page home">
      <div className="eyebrow">
        <span className="status-dot" /> YOUR EDGE STARTS HERE
      </div>
      <section className="hero">
        <div className="hero-copy">
          <h1>
            Big plays.
            <br />
            Bigger <em>picture.</em>
          </h1>
          <p>
            Go beyond the scoreboard. Explore the teams, follow the matchups,
            and get closer to the numbers behind the game.
          </p>
          <div className="hero-actions">
            <Link href="/games" className="button primary">
              Explore games <span>↗</span>
            </Link>
            <Link href="/teams" className="button secondary">
              Find your team <span>→</span>
            </Link>
          </div>
          <p className="hero-note">Straight to the stats. No account needed.</p>
        </div>
        <div className="field-art" aria-hidden="true">
          <div className="field-lines">
            <span>10</span>
            <span>20</span>
            <span>30</span>
            <span>40</span>
            <span>50</span>
          </div>
          <svg viewBox="0 0 400 420">
            <path
              className="play-route"
              d="M80 350 L80 230 Q80 185 140 185 L230 185 Q290 185 290 120 L290 60"
            />
            <path d="m273 80 17-22 17 22" />
            <circle cx="80" cy="350" r="13" />
            <circle cx="170" cy="310" r="10" />
            <path d="m230 280 18 18 m0-18-18 18 M125 110l18 18m0-18-18 18" />
          </svg>
          <div className="field-label">
            THE GAME, DECODED.<span>JOLT / NFL</span>
          </div>
        </div>
      </section>
      <section className="explore-section">
        <div className="section-heading">
          <h2>Choose your angle.</h2>
          <span className="muted">One game. Every perspective.</span>
        </div>
        <div className="feature-grid">
          <Link className="feature-card" href="/teams">
            <span className="card-number">01 / THE ROSTER</span>
            <h3>
              Know your team. <span>↗</span>
            </h3>
            <p>From the franchise to the players who make it happen.</p>
          </Link>
          <Link className="feature-card peach" href="/games">
            <span className="card-number">02 / THE MATCHUP</span>
            <h3>
              Break down the game. <span>↗</span>
            </h3>
            <p>Schedules, scores, and the stats that tell the story.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
