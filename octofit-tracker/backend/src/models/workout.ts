import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, required: true }],
  },
  { timestamps: true },
)

export const Workout = mongoose.model('Workout', workoutSchema)
