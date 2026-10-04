"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="sidebar">
      <Link href="/" className="brand" aria-label="Jolt home">
        <span className="brand-icon">ϟ</span> JOLT
        <span className="brand-dot">.</span>
      </Link>
      <p className="nav-caption">THE PLAYBOOK</p>
      <nav aria-label="Main navigation">
        {[
          ["/", "Overview", "01"],
          ["/teams", "Teams", "02"],
          ["/games", "Games", "03"],
        ].map(([href, label, n]) => (
          <Link
            key={href}
            href={href}
            aria-current={
              (href === "/" ? path === href : path.startsWith(href))
                ? "page"
                : undefined
            }
          >
            <span>{n}</span>
            {label}
            <span className="nav-arrow">↗</span>
          </Link>
        ))}
      </nav>
      <div className="sidebar-note">
        <span className="status-dot" /> Built for the game.
        <p>Football. In focus.</p>
      </div>
    </aside>
  );
}
