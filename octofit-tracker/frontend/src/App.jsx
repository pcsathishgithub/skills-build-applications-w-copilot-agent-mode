import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { apiBaseUrl } from './api'
import './App.css'

const navigation = [
  { label: 'Overview', to: '/' },
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Teams', to: '/teams' },
  { label: 'Users', to: '/users' },
  { label: 'Workouts', to: '/workouts' },
]

function Overview() {
  return (
    <section className="overview">
      <p className="eyebrow">Your movement, in focus</p>
      <h1>Make today<br /><em>count.</em></h1>
      <p className="overview-copy">Track the effort, find your people, and keep the next good choice close.</p>
      <div className="overview-links">
        <NavLink className="primary-action" to="/activities">View activity <span aria-hidden="true">&gt;</span></NavLink>
        <NavLink className="text-action" to="/workouts">Choose a workout</NavLink>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/" aria-label="Octofit home"><span className="brand-mark">O</span><span>octofit</span></NavLink>
        <nav className="main-nav" aria-label="Primary navigation">
          {navigation.map((item) => <NavLink key={item.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={item.to}>{item.label}</NavLink>)}
        </nav>
        <div className="api-indicator" title={apiBaseUrl}><span /> API online</div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer><span>OCTOFIT TRACKER</span><span>MOVE WITH INTENT | {new Date().getFullYear()}</span></footer>
    </div>
  )
}

export default App
