import { useApiResource } from '../api'

function Leaderboard() {
  const { data: entries, loading, error } = useApiResource('leaderboard')

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">The weekly climb</p>
          <h1>Leaderboard</h1>
        </div>
        <span className="count-badge">{entries.length} ranked</span>
      </div>
      {loading && <p className="status-message">Loading rankings...</p>}
      {error && <p className="status-message error-message">{error}</p>}
      {!loading && !error && (
        <div className="ranking-list">
          {entries.map((entry, index) => (
            <article className={`ranking-row rank-${entry.rank || index + 1}`} key={entry._id || entry.id || entry.rank}>
              <span className="rank-number">{entry.rank || index + 1}</span>
              <div><h2>{entry.user?.name || entry.user?.username || entry.user || 'Member'}</h2><p>{entry.team?.name || entry.team || 'Independent'}</p></div>
              <strong>{entry.points} pts</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Leaderboard
