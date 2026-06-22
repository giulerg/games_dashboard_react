import { MultiSelectFilter } from './MultiSelectFilter'

export function FilterPanel({
  activeFilterCount,
  filters,
  filteredCount,
  options,
  totalCount,
  onGenresChange,
  onPlatformsChange,
  onReset,
  onYearRangeChange,
}) {
  const minYear = options.yearBounds.min
  const maxYear = options.yearBounds.max
  const yearRange = filters.yearRange

  const updateMinYear = (value) => {
    const min = Math.min(Number(value), yearRange.max)
    onYearRangeChange({ ...yearRange, min })
  }

  const updateMaxYear = (value) => {
    const max = Math.max(Number(value), yearRange.min)
    onYearRangeChange({ ...yearRange, max })
  }

  return (
    <section className="filters-panel" aria-label="Dashboard filters">
      <div className="filters-summary">
        <div>
          <span className="filter-label">Filters</span>
          <strong>
            {filteredCount} / {totalCount}
          </strong>
        </div>
        <button type="button" onClick={onReset} disabled={activeFilterCount === 0}>
          Reset
        </button>
      </div>

      <MultiSelectFilter
        label="Platform"
        options={options.platforms}
        placeholder="All platforms"
        selected={filters.platforms}
        onChange={onPlatformsChange}
      />

      <MultiSelectFilter
        label="Genre"
        options={options.genres}
        placeholder="All genres"
        selected={filters.genres}
        onChange={onGenresChange}
      />

      <div className="filter-control year-filter">
        <span className="filter-label">Year range</span>
        <div className="year-values">
          <strong>{yearRange.min || '-'}</strong>
          <strong>{yearRange.max || '-'}</strong>
        </div>
        <div className="range-stack">
          <input
            aria-label="Minimum year"
            min={minYear}
            max={maxYear}
            type="range"
            value={yearRange.min || minYear}
            onChange={(event) => updateMinYear(event.target.value)}
          />
          <input
            aria-label="Maximum year"
            min={minYear}
            max={maxYear}
            type="range"
            value={yearRange.max || maxYear}
            onChange={(event) => updateMaxYear(event.target.value)}
          />
        </div>
      </div>
    </section>
  )
}
