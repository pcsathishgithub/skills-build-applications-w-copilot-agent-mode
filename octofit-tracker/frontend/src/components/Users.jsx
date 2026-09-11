import { useApiResource } from '../api'

function Users() {
  const { data: users, loading, error } = useApiResource('users')

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Community</p>
          <h1>Members</h1>
        </div>
        <span className="count-badge">{users.length} active</span>
      </div>
      {loading && <p className="status-message">Loading members...</p>}
      {error && <p className="status-message error-message">{error}</p>}
      {!loading && !error && (
        <div className="content-grid">
          {users.map((user) => (
            <article className="data-card" key={user._id || user.id || user.username}>
              <div className="avatar">{(user.name || user.username || '?').charAt(0)}</div>
              <div>
                <h2>{user.name || user.username}</h2>
                <p>@{user.username || 'member'}</p>
                <small>{user.email || 'Octofit member'}</small>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users
