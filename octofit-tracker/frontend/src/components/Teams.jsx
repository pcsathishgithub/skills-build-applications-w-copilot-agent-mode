import { useApiResource } from '../api'

function Teams() {
  const { data: teams, loading, error } = useApiResource('teams')

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Find your pace</p>
          <h1>Teams</h1>
        </div>
        <span className="count-badge">{teams.length} squads</span>
      </div>
      {loading && <p className="status-message">Loading teams...</p>}
      {error && <p className="status-message error-message">{error}</p>}
      {!loading && !error && (
        <div className="content-grid">
          {teams.map((team) => (
            <article className="data-card team-card" key={team._id || team.id || team.name}>
              <span className="card-kicker">Team</span>
              <h2>{team.name}</h2>
              <p>{team.description || 'A crew moving together.'}</p>
              <strong>{team.members?.length || 0} members</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
