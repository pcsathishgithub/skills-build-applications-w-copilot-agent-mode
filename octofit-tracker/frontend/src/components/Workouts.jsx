import { useApiResource } from '../api'

function Workouts() {
  const { data: workouts, loading, error } = useApiResource('workouts')

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Built for today</p>
          <h1>Workouts</h1>
        </div>
        <span className="count-badge">{workouts.length} plans</span>
      </div>
      {loading && <p className="status-message">Loading workouts...</p>}
      {error && <p className="status-message error-message">{error}</p>}
      {!loading && !error && (
        <div className="content-grid">
          {workouts.map((workout) => (
            <article className="data-card workout-card" key={workout._id || workout.id || workout.name}>
              <div className="workout-topline"><span className="card-kicker">{workout.type}</span><span className="difficulty">{workout.difficulty}</span></div>
              <h2>{workout.name}</h2>
              <p>{workout.durationMinutes} minutes · {workout.exercises?.length || 0} exercises</p>
              <ul>{(workout.exercises || []).slice(0, 3).map((exercise) => <li key={exercise}>{exercise}</li>)}</ul>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts
