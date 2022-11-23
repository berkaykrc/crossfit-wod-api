import { Mongoose as mongoose } from "mongoose";

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  "name": { type: String, required: true, maxLength: 300 },
  "mode": { type: String, required: true, maxLength: 300 },
  "equipment": Array,
  "exercises": Array,
  "createdAt": { type: Date, default: Date.now },
  "updatedAt": { type: Date, default: Date.now },
  "trainerTips": Array,
})
export const WorkoutModel = mongoose.model('Workout', workoutSchema);


