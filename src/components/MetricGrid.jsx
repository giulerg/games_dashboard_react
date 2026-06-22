export function MetricGrid({ dashboard, status }) {
  const loadingValue = status === 'loading' ? '...' : null

  return (
    <section className="metric-grid">
      <article className="metric-card">
        <span>Total games</span>
        <strong>{loadingValue ?? dashboard.total}</strong>
      </article>
      <article className="metric-card">
        <span>Avg critic score</span>
        <strong>{loadingValue ?? dashboard.avgCritic}</strong>
      </article>
      <article className="metric-card">
        <span>Avg user score</span>
        <strong>{loadingValue ?? dashboard.avgUser}</strong>
      </article>
      <article className="metric-card">
        <span>Genres</span>
        <strong>{loadingValue ?? dashboard.genres}</strong>
      </article>
      <article className="metric-card">
        <span>Best Year</span>
        <strong>{loadingValue ?? dashboard.bestYear?.year ?? '-'}</strong>
        {!loadingValue && dashboard.bestYear ? <small>{dashboard.bestYear.games} releases</small> : null}
      </article>
    </section>
  )
}
