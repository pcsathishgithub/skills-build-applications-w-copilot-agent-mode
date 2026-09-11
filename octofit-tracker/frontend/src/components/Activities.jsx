import { useApiResource } from '../api'

function Activities() {
  const { data: activities, loading, error } = useApiResource('activities')

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Recent movement</p>
          <h1>Activities</h1>
        </div>
        <span className="count-badge">{activities.length} logged</span>
      </div>
      {loading && <p className="status-message">Loading activities...</p>}
      {error && <p className="status-message error-message">{error}</p>}
      {!loading && !error && (
        <div className="table-wrap">
          <table className="activity-table">
            <thead><tr><th>Member</th><th>Activity</th><th>Duration</th><th>Calories</th></tr></thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td>{activity.user?.name || activity.user?.username || activity.user || 'Member'}</td>
                  <td><strong>{activity.type}</strong><small>{activity.distanceKm ? `${activity.distanceKm} km` : 'Workout'}</small></td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.calories} kcal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
