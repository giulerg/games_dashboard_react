export function SessionView({ sessionLog }) {
  return (
    <section className="session-view">
      <div className="page-heading">
        <div>
          <p className="eyebrow">LLM Session</p>
          <h1>Session log</h1>
        </div>
        <p>
          Текст будет подтянут из <strong>public/data/llm-session.log</strong>
        </p>
      </div>
      <pre className={sessionLog ? 'log-panel' : 'log-panel empty'}>
        {sessionLog ||
          'Файл лога пока не найден. Добавьте public/data/llm-session.log, и текст появится здесь.'}
      </pre>
    </section>
  )
}
