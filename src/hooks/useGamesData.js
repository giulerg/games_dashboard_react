import { useEffect, useState } from 'react'
import { parseCsv } from '../utils/csv'

export const CSV_URL = '/data/games_cleaned.csv'

export function useGamesData() {
  const [games, setGames] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetch(CSV_URL)
      .then((response) => {
        if (!response.ok) throw new Error('CSV not found')
        return response.text()
      })
      .then((text) => {
        if (ignore) return

        const parsedGames = parseCsv(text).map((game) => ({
          ...game,
          Year_of_Release: Number(game.Year_of_Release),
          Critic_Score: Number(game.Critic_Score),
          User_Score: Number(game.User_Score),
        }))

        setGames(parsedGames)
        setStatus('ready')
      })
      .catch(() => {
        if (!ignore) setStatus('error')
      })

    return () => {
      ignore = true
    }
  }, [])

  return { games, status }
}
