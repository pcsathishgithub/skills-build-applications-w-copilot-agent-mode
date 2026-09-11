import express from 'express'
import { connectDatabase } from './config/database.js'
import { Activity } from './models/activity.js'
import { Leaderboard } from './models/leaderboard.js'
import { Team } from './models/team.js'
import { User } from './models/user.js'
import { Workout } from './models/workout.js'

const app = express()
const port = Number(process.env.PORT) || 8000
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())
//  api health check endpoint - works
app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/api', (_request, response) => {
  response.json({ baseUrl })
})

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().lean())
})

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'name username').lean())
})

app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user', 'name username').sort({ completedAt: -1 }).lean())
})

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user', 'name username').populate('team', 'name').sort({ rank: 1 }).lean())
})

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ difficulty: 1, name: 1 }).lean())
})

const startServer = async () => {
  await connectDatabase()
  app.listen(port, () => {
    console.log(`OctoFit API listening at ${baseUrl}`)
  })
}

startServer().catch((error) => {
  console.error('Unable to start OctoFit API:', error)
  process.exitCode = 1
})