import { useEffect, useState } from 'react'

const LOG_URL = 'data/llm-session.log'

export function useSessionLog() {
  const [sessionLog, setSessionLog] = useState('')

  useEffect(() => {
    let ignore = false

    fetch(LOG_URL)
      .then((response) => (response.ok ? response.text() : ''))
      .then((text) => {
        if (!ignore) setSessionLog(text)
      })
      .catch(() => {
        if (!ignore) setSessionLog('')
      })

    return () => {
      ignore = true
    }
  }, [])

  return sessionLog
}
