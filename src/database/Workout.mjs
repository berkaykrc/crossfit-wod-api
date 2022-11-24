import WorkoutModel from './WorkoutModel.mjs'

const getAllWorkouts = () => {
  WorkoutModel.find({}, (err, workouts) => {
    if (err) throw err
    if (!workouts) throw "workouts boş"
    return workouts
  })
}

const getOneWorkout = ( workoutId) => {
  WorkoutModel.findOne({ _id: workoutId }, (err, workout) => {
    if (err) throw err
    if (!workout) throw "nothing found"
    return workout
  })
}

const createNewWorkout = async (data) => {
  WorkoutModel.findOne({ name: data.name })
    .exec((err, found_workout) => {
      if (err) {
        return next(err);
      }
      if (found_workout) {
        return next(found_workout)
      } else {
        WorkoutModel.create(data, function (err, data) {
          return err ? next(err) : data
        })
      }
    })
}


export const workoutUtils = { getAllWorkouts, getOneWorkout, createNewWorkout }