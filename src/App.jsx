import { DashboardView } from './components/DashboardView'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useGamesData } from './hooks/useGamesData'
import './App.css'

function App() {
  const { games, status } = useGamesData()

  return (
    <main className="app-shell">
      <Header />
      <DashboardView games={games} status={status} />
      <Footer />
    </main>
  )
}

export default App
