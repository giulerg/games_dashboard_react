import { useDashboardData } from '../hooks/useDashboardData'
import { useGameFilters } from '../hooks/useGameFilters'
import { CSV_URL } from '../hooks/useGamesData'
import { DashboardCharts } from './DashboardCharts'
import { FilterPanel } from './FilterPanel'
import { MetricGrid } from './MetricGrid'

export function DashboardView({ games, status }) {
  const {
    filteredGames,
    filterOptions,
    filters,
    updateGenres,
    updatePlatforms,
    updateYearRange,
  } = useGameFilters(games)
  const dashboard = useDashboardData(filteredGames)

  return (
    <section className="dashboard-view">
      <div className="page-heading">
        <div>
          <h1>Video Games Overview, 1990-2010</h1>
        </div>
      </div>

      {status === 'error' ? (
        <div className="empty-state">
          Could not load CSV from <code>{CSV_URL}</code>
        </div>
      ) : (
        <>
          <FilterPanel
            filters={filters}
            options={filterOptions}
            onGenresChange={updateGenres}
            onPlatformsChange={updatePlatforms}
            onYearRangeChange={updateYearRange}
          />
          <MetricGrid dashboard={dashboard} status={status} />
          <DashboardCharts dashboard={dashboard} />
        </>
      )}
    </section>
  )
}
