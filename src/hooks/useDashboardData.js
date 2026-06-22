import { useMemo } from 'react'
import { average } from '../utils/csv'

export function useDashboardData(games) {
  return useMemo(() => {
    const genreMap = new Map()
    const platformMap = new Map()
    const yearMap = new Map()
    const scoreGenreMap = new Map()

    games.forEach((game) => {
      if (game.Genre) {
        genreMap.set(game.Genre, (genreMap.get(game.Genre) ?? 0) + 1)
      }

      if (
        game.Genre &&
        Number.isFinite(game.Critic_Score) &&
        Number.isFinite(game.User_Score)
      ) {
        const scoreGenre = scoreGenreMap.get(game.Genre) ?? {
          genre: game.Genre,
          games: 0,
          criticScores: [],
          userScores: [],
        }
        scoreGenre.games += 1
        scoreGenre.criticScores.push(game.Critic_Score)
        scoreGenre.userScores.push(game.User_Score)
        scoreGenreMap.set(game.Genre, scoreGenre)
      }

      if (game.Platform) {
        const platform = platformMap.get(game.Platform) ?? {
          platform: game.Platform,
          games: 0,
          criticScores: [],
          userScores: [],
        }
        platform.games += 1
        platform.criticScores.push(game.Critic_Score)
        platform.userScores.push(game.User_Score)
        platformMap.set(game.Platform, platform)
      }

      if (Number.isFinite(game.Year_of_Release)) {
        const year = yearMap.get(game.Year_of_Release) ?? {
          year: game.Year_of_Release,
          games: 0,
        }
        year.games += 1
        yearMap.set(game.Year_of_Release, year)
      }
    })

    const genreData = [...genreMap.entries()]
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6)

    const platformData = [...platformMap.values()]
      .map((platform) => ({
        platform: platform.platform,
        games: platform.games,
        critic: Number(average(platform.criticScores).toFixed(1)),
        user: Number(average(platform.userScores).toFixed(1)),
      }))
      .sort((a, b) => b.games - a.games)
      .slice(0, 8)

    const yearData = [...yearMap.values()].sort((a, b) => a.year - b.year)
    const bestYear =
      [...yearMap.values()].sort((a, b) => b.games - a.games || b.year - a.year)[0] ??
      null

    const scoreComparisonData = [...scoreGenreMap.values()]
      .map((genre) => ({
        name: genre.genre,
        games: genre.games,
        critic: Number(average(genre.criticScores).toFixed(1)),
        criticScaled: Number((average(genre.criticScores) / 10).toFixed(1)),
        user: Number(average(genre.userScores).toFixed(1)),
      }))
      .sort((a, b) => b.games - a.games)
      

    const topCriticGames = [...games]
      .filter((game) => Number.isFinite(game.Critic_Score))
      .sort((a, b) => b.Critic_Score - a.Critic_Score)
      .slice(0, 10)

    const topUserGames = [...games]
      .filter((game) => Number.isFinite(game.User_Score))
      .sort((a, b) => b.User_Score - a.User_Score)
      .slice(0, 10)

    return {
      genreData,
      platformData,
      scoreComparisonData,
      yearData,
      topCriticGames,
      topUserGames,
      total: games.length,
      avgCritic: average(games.map((game) => game.Critic_Score)).toFixed(1),
      avgUser: average(games.map((game) => game.User_Score)).toFixed(1),
      bestYear,
      genres: genreMap.size,
    }
  }, [games])
}
