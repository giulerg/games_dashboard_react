import { useMemo, useState } from 'react'

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b))
}

function getYearBounds(games) {
  const years = games
    .map((game) => game.Year_of_Release)
    .filter((year) => Number.isFinite(year))

  if (!years.length) return { min: 0, max: 0 }

  return {
    min: Math.min(...years),
    max: Math.max(...years),
  }
}

export function useGameFilters(games) {
  const filterOptions = useMemo(() => {
    const yearBounds = getYearBounds(games)

    return {
      platforms: uniqueSorted(games.map((game) => game.Platform)),
      genres: uniqueSorted(games.map((game) => game.Genre)),
      yearBounds,
    }
  }, [games])

  const [filters, setFilters] = useState({
    platforms: [],
    genres: [],
    yearRange: null,
  })

  const effectiveYearRange = filters.yearRange ?? filterOptions.yearBounds

  const filteredGames = useMemo(() => {
    const selectedPlatforms = new Set(filters.platforms)
    const selectedGenres = new Set(filters.genres)
    const { min, max } = effectiveYearRange

    return games.filter((game) => {
      const platformMatches =
        selectedPlatforms.size === 0 || selectedPlatforms.has(game.Platform)
      const genreMatches = selectedGenres.size === 0 || selectedGenres.has(game.Genre)
      const yearMatches =
        !Number.isFinite(game.Year_of_Release) ||
        (game.Year_of_Release >= min && game.Year_of_Release <= max)

      return platformMatches && genreMatches && yearMatches
    })
  }, [effectiveYearRange, filters.genres, filters.platforms, games])

  const updatePlatforms = (platforms) => {
    setFilters((current) => ({ ...current, platforms }))
  }

  const updateGenres = (genres) => {
    setFilters((current) => ({ ...current, genres }))
  }

  const updateYearRange = (yearRange) => {
    setFilters((current) => ({ ...current, yearRange }))
  }

  return {
    filteredGames,
    filterOptions,
    filters: {
      ...filters,
      yearRange: effectiveYearRange,
    },
    updatePlatforms,
    updateGenres,
    updateYearRange,
  }
}
