# Games Dashboard

Interactive dashboard for video game industry data built with React, Vite, and Recharts.

Live demo: `https://giulerg.github.io/games_dashboard_react/`

## Overview

The app is a single dashboard page with interactive visual analytics for the games dataset.

## Dataset

The dashboard uses `public/data/games_cleaned.csv` with these fields:

- `Name`
- `Platform`
- `Year_of_Release`
- `Genre`
- `Critic_Score`
- `User_Score`
- `Rating`

The current CSV is already cleaned for the assignment scope: valid rows, years within the required range, and numeric score fields.

## Features

### Filters

All filters work together with AND logic and update every KPI and chart at once.

- Platform multi-select
- Genre multi-select
- Year range

### KPI Cards

- Total games
- Average critic score
- Average user score
- Genres
- Best year by number of releases

### Charts

- Releases by year
- Top genres
- Critic vs user score, clustered bar chart
- Games by platform
- Top critic scores with Best 5 / Best 10 toggle
- Top user scores with Best 5 / Best 10 toggle

## Tech Stack

- React
- Vite
- Recharts
- CSS modules-style plain CSS organization
- GitHub Pages deployment via GitHub Actions

## Project Structure

```text
src/
  components/
    DashboardCharts.jsx
    DashboardView.jsx
    FilterPanel.jsx
    Footer.jsx
    Header.jsx
    MetricGrid.jsx
    MultiSelectFilter.jsx
  hooks/
    useDashboardData.js
    useGameFilters.js
    useGamesData.js
  utils/
    csv.js
```

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Build production assets:

```bash
npm run build
```

## GitHub Pages Deployment

The project is configured for GitHub Pages in `vite.config.js`:

```js
base: '/games_dashboard_react/'
```

Deployment workflow:

```text
.github/workflows/deploy.yml
```

To deploy:

1. Push changes to `main`.
2. In GitHub repository settings, open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Wait for the `Deploy to GitHub Pages` workflow to finish.
5. Open `https://giulerg.github.io/games_dashboard_react/`.

## Verification Notes

Manual checks performed during development:

- Confirmed current CSV row count: `5115`.
- Confirmed year range: `1992-2010`.
- Confirmed no invalid `User_Score` values in the current CSV.
- Confirmed KPI calculations after loading current CSV:
  - Total games: `5115`
  - Average critic score: `69.8`
  - Average user score: `7.3`
  - Genres: `12`
  - Best year: `2008`, `592` releases
- Confirmed `npm run lint` passes.

Note: in the local Codex sandbox, `npm run build` can fail with Windows `spawn EPERM` while loading Vite config. This is an environment restriction, not a project code error. The GitHub Actions workflow runs on Ubuntu and should not hit that sandbox-specific issue.
