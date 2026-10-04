import ToggleDarkMode from "./ToggleDarkMode";
export default function Header() {
  return (
    <header className="topbar">
      <span>
        NFL EXPLORER <span className="topbar-divider">/</span>{" "}
        <span className="muted">Every detail matters.</span>
      </span>
      <ToggleDarkMode />
    </header>
  );
}
