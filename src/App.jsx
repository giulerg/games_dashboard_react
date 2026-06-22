import { useState } from 'react'
import { DashboardView } from './components/DashboardView'
import { Header } from './components/Header'
import { SessionView } from './components/SessionView'
import { useGamesData } from './hooks/useGamesData'
import { useSessionLog } from './hooks/useSessionLog'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { games, status } = useGamesData()
  const sessionLog = useSessionLog()

  return (
    <main className="app-shell">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'dashboard' ? (
        <DashboardView games={games} status={status} />
      ) : (
        <SessionView sessionLog={sessionLog} />
      )}
    </main>
  )
}

export default App