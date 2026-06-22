export function SessionView({ sessionLog }) {
  return (
    <section className="session-view">
      <div className="page-heading">
        <div>
          <h1>Session log</h1>
        </div>
      </div>
      <pre className={sessionLog ? 'log-panel' : 'log-panel empty'}>
        {sessionLog ||
          'Файл лога пока не найден. Добавьте public/data/llm-session.log, и текст появится здесь.'}
      </pre>
    </section>
  )
}
