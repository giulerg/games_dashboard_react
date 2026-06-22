import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const COLORS = ['#7c3aed', '#db2777', '#f472b6', '#a855f7', '#fb7185', '#8b5cf6']
const SCORE_LIMITS = [5, 10]

function ScoreLimitToggle({ value, onChange }) {
  return (
    <div className="score-toggle" aria-label="Top score limit">
      {SCORE_LIMITS.map((limit) => (
        <button
          className={value === limit ? 'active' : ''}
          key={limit}
          type="button"
          onClick={() => onChange(limit)}
        >
          Best {limit}
        </button>
      ))}
    </div>
  )
}

export function DashboardCharts({ dashboard }) {
  const [criticLimit, setCriticLimit] = useState(5)
  const [userLimit, setUserLimit] = useState(5)

  if (dashboard.total === 0) {
    return (
      <div className="empty-state">
        No data for the selected filters. Try expanding platform, genre, or year range.
      </div>
    )
  }

  const topCriticGames = dashboard.topCriticGames.slice(0, criticLimit)
  const topUserGames = dashboard.topUserGames.slice(0, userLimit)
  const criticListClassName = criticLimit === 10 ? 'top-list compact' : 'top-list'
  const userListClassName = userLimit === 10 ? 'top-list compact' : 'top-list'

  return (
    <section className="chart-grid">
      <article className="chart-card">
        <div className="card-heading">
          <h2>Releases by year</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dashboard.yearData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={34} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="games"
              stroke="#db2777"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </article>

      <article className="chart-card">
        <div className="card-heading">
          <h2>Top genres</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dashboard.genreData}
              dataKey="value"
              innerRadius={68}
              nameKey="name"
              outerRadius={108}
              paddingAngle={3}
            >
              {dashboard.genreData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="legend-list">
          {dashboard.genreData.map((item, index) => (
            <span key={item.name}>
              <i style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              {item.name}
            </span>
          ))}
        </div>
      </article>

      <article className="chart-card">
        <div className="card-heading">
          <h2>Critic vs user score</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={dashboard.scoreComparisonData}
            barGap={4}
            barCategoryGap="24%"
            margin={{ bottom: 34 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              interval={0}
              tickLine={false}
              axisLine={false}
              angle={-35}
              height={56}
              textAnchor="end"
              tick={{ fontSize: 11 }}
            />
            <YAxis domain={[0, 10]} tickLine={false} axisLine={false} width={34} />
            <Tooltip />
            <Bar dataKey="criticScaled" name="Avg critic / 10" fill="#8b5cf6" radius={[7, 7, 0, 0]} />
            <Bar dataKey="user" name="Avg user" fill="#db2777" radius={[7, 7, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </article>

      <article className="chart-card">
        <div className="card-heading">
          <h2>Platforms</h2>
        </div>
        <ResponsiveContainer width="100%" height={310}>
          <BarChart data={dashboard.platformData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="platform" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={34} />
            <Tooltip />
            <Bar dataKey="games" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </article>

      <article className="chart-card score-card">
        <div className="card-heading">
          <h2>Top critic scores</h2>
          <ScoreLimitToggle value={criticLimit} onChange={setCriticLimit} />
        </div>
        <div className={criticListClassName}>
          {topCriticGames.map((game, index) => (
            <div className="top-game" key={`${game.Name}-${game.Platform}`}>
              <div className="top-rank">{index + 1}</div>
              <div>
                <strong>{game.Name}</strong>
                <span>
                  {game.Platform} / {game.Genre}
                </span>
              </div>
              <b>{game.Critic_Score}</b>
            </div>
          ))}
        </div>
      </article>

      <article className="chart-card score-card">
        <div className="card-heading">
          <h2>Top user scores</h2>
          <ScoreLimitToggle value={userLimit} onChange={setUserLimit} />
        </div>
        <div className={userListClassName}>
          {topUserGames.map((game, index) => (
            <div className="top-game" key={`${game.Name}-${game.Platform}-user`}>
              <div className="top-rank">{index + 1}</div>
              <div>
                <strong>{game.Name}</strong>
                <span>
                  {game.Platform} / {game.Genre}
                </span>
              </div>
              <b>{game.User_Score}</b>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
