"use client";
import { useEffect, useState } from "react";
export default function ToggleDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    let value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    try {
      const saved = localStorage.getItem("jolt-theme");
      if (saved) value = saved === "dark";
    } catch {}
    setDark(value);
    document.documentElement.classList.toggle("dark", value);
  }, []);
  function toggle() {
    const value = !dark;
    setDark(value);
    document.documentElement.classList.toggle("dark", value);
    try {
      localStorage.setItem("jolt-theme", value ? "dark" : "light");
    } catch {}
  }
  return (
    <button
      className="theme-button"
      onClick={toggle}
      aria-label={dark ? "Use light theme" : "Use dark theme"}
      aria-pressed={dark}
    >
      {dark ? "☀" : "☾"}
      <span>{dark ? "Light" : "Dark"}</span>
    </button>
  );
}
