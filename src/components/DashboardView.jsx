import { useDashboardData } from '../hooks/useDashboardData'
import { useGameFilters } from '../hooks/useGameFilters'
import { CSV_URL } from '../hooks/useGamesData'
import { DashboardCharts } from './DashboardCharts'
import { FilterPanel } from './FilterPanel'
import { MetricGrid } from './MetricGrid'

export function DashboardView({ games, status }) {
  const {
    activeFilterCount,
    filteredGames,
    filterOptions,
    filters,
    resetFilters,
    updateGenres,
    updatePlatforms,
    updateYearRange,
  } = useGameFilters(games)
  const dashboard = useDashboardData(filteredGames)

  return (
    <section className="dashboard-view">
      <div className="page-heading">
        <div>
          <p className="eyebrow">CSV analytics</p>
          <h1>Game releases, scores, and genres</h1>
        </div>
        <p>
          Dashboard built from <strong>public/data/games_cleaned.csv</strong>
        </p>
      </div>

      {status === 'error' ? (
        <div className="empty-state">
          Не удалось загрузить CSV из <code>{CSV_URL}</code>
        </div>
      ) : (
        <>
          <FilterPanel
            activeFilterCount={activeFilterCount}
            filteredCount={filteredGames.length}
            filters={filters}
            options={filterOptions}
            totalCount={games.length}
            onGenresChange={updateGenres}
            onPlatformsChange={updatePlatforms}
            onReset={resetFilters}
            onYearRangeChange={updateYearRange}
          />
          <MetricGrid dashboard={dashboard} status={status} />
          <DashboardCharts dashboard={dashboard} />
        </>
      )}
    </section>
  )
}
