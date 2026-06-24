import { CSV_URL } from '../hooks/useGamesData'

export function Header() {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-icon" aria-hidden="true">
          <svg viewBox="0 0 48 48">
            <path d="M15 18h18c5 0 9 4 9 9v3c0 4-3 7-7 7-2 0-4-1-5-3l-2-3h-8l-2 3c-1 2-3 3-5 3-4 0-7-3-7-7v-3c0-5 4-9 9-9Z" />
            <path d="M16 28h8M20 24v8M32 25h.01M36 30h.01" />
          </svg>
        </span>
        <span>Games Dashboard</span>
      </div>

      <a className="download-button" href={CSV_URL} download="games.csv">
        games.csv
      </a>
    </header>
  )
}
