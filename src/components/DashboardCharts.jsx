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
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const COLORS = ['#7c3aed', '#db2777', '#f472b6', '#a855f7', '#fb7185', '#8b5cf6']

export function DashboardCharts({ dashboard }) {
  if (dashboard.total === 0) {
    return (
      <div className="empty-state">
        No data for the selected filters. Try expanding platform, genre, or year range.
      </div>
    )
  }

  return (
    <section className="chart-grid">
      <article className="chart-card wide">
        <div className="card-heading">
          <h2>Releases by year</h2>
          <span>filtered</span>
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
          <h2>Critic vs user score</h2>
          <span>scatter</span>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="critic"
              domain={[0, 100]}
              name="Critic"
              tickLine={false}
              type="number"
              axisLine={false}
            />
            <YAxis
              dataKey="user"
              domain={[0, 10]}
              name="User"
              tickLine={false}
              type="number"
              axisLine={false}
              width={34}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value, name) => [
                value,
                name === 'critic' ? 'Critic' : 'User',
              ]}
              labelFormatter={(_, items) => items?.[0]?.payload?.name ?? ''}
            />
            <Scatter data={dashboard.scoreComparisonData} fill="#db2777" />
          </ScatterChart>
        </ResponsiveContainer>
      </article>

      <article className="chart-card">
        <div className="card-heading">
          <h2>Top genres</h2>
          <span>by count</span>
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

      <article className="chart-card wide">
        <div className="card-heading">
          <h2>Platforms</h2>
          <span>top 8 by games</span>
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

      <article className="chart-card">
        <div className="card-heading">
          <h2>Top critic scores</h2>
          <span>best 5</span>
        </div>
        <div className="top-list">
          {dashboard.topCriticGames.map((game) => (
            <div className="top-game" key={`${game.Name}-${game.Platform}`}>
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

      <article className="chart-card">
        <div className="card-heading">
          <h2>Top user scores</h2>
          <span>best 5</span>
        </div>
        <div className="top-list">
          {dashboard.topUserGames.map((game) => (
            <div className="top-game" key={`${game.Name}-${game.Platform}-user`}>
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