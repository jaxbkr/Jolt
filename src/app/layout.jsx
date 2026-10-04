import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./globals.css";
export const metadata = {
  title: "Jolt — Football in focus",
  description:
    "Explore NFL teams, games and player statistics. No account needed.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Sidebar />
        <div className="app-shell">
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <footer>
            JOLT <span>Football in focus. Data by API-Sports.</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
