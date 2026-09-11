import mongoose from 'mongoose'
import { connectDatabase } from '../config/database.js'
import { Activity } from '../models/activity.js'
import { Leaderboard } from '../models/leaderboard.js'
import { Team } from '../models/team.js'
import { User } from '../models/user.js'
import { Workout } from '../models/workout.js'

const seed = async () => {
  console.log('Seed the octofit_db database with test data')
  await connectDatabase()

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ])

  const users = await User.insertMany([
    { name: 'Maya Chen', email: 'maya.chen@example.com', username: 'mayamoves', avatarUrl: '/avatars/maya.png' },
    { name: 'Jordan Ellis', email: 'jordan.ellis@example.com', username: 'jordanruns', avatarUrl: '/avatars/jordan.png' },
    { name: 'Sam Rivera', email: 'sam.rivera@example.com', username: 'samstrong', avatarUrl: '/avatars/sam.png' },
  ])

  const teams = await Team.insertMany([
    {
      name: 'Summit Striders',
      description: 'Consistent runners focused on endurance and steady progress.',
      members: [users[0]._id, users[1]._id],
    },
    {
      name: 'Core Collective',
      description: 'Strength-minded teammates building a stronger daily routine.',
      members: [users[2]._id],
    },
  ])

  await Activity.insertMany([
    {
      user: users[0]._id,
      type: 'Run',
      durationMinutes: 42,
      distanceKm: 6.4,
      calories: 480,
      completedAt: new Date('2026-09-08T07:30:00Z'),
    },
    {
      user: users[1]._id,
      type: 'Cycling',
      durationMinutes: 55,
      distanceKm: 18.2,
      calories: 610,
      completedAt: new Date('2026-09-09T17:45:00Z'),
    },
    {
      user: users[2]._id,
      type: 'Strength',
      durationMinutes: 35,
      calories: 290,
      completedAt: new Date('2026-09-10T18:15:00Z'),
    },
  ])

  await Leaderboard.insertMany([
    { user: users[0]._id, team: teams[0]._id, points: 1280, rank: 1 },
    { user: users[1]._id, team: teams[0]._id, points: 1095, rank: 2 },
    { user: users[2]._id, team: teams[1]._id, points: 875, rank: 3 },
  ])

  await Workout.insertMany([
    {
      name: 'Morning Momentum',
      type: 'Cardio',
      difficulty: 'beginner',
      durationMinutes: 20,
      exercises: ['Marching high knees', 'Bodyweight squats', 'Step-back lunges'],
    },
    {
      name: 'Full Body Builder',
      type: 'Strength',
      difficulty: 'intermediate',
      durationMinutes: 35,
      exercises: ['Push-ups', 'Goblet squats', 'Bent-over rows', 'Plank'],
    },
    {
      name: 'Athlete Engine',
      type: 'HIIT',
      difficulty: 'advanced',
      durationMinutes: 30,
      exercises: ['Burpees', 'Jump squats', 'Mountain climbers', 'Bear crawls'],
    },
  ])

  console.log('Seed complete: users, teams, activities, leaderboard, and workouts populated')
}

seed()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })
