import WorkoutModel from "./WorkoutModel.mjs";

const getAllWorkouts = () => {
  const allWorkouts = WorkoutModel.find({}, (err, workouts) => err || workouts);
  return allWorkouts;
};

const getOneWorkout = (workoutId) => {
  WorkoutModel.findOne({ _id: workoutId }, (err, workout) => {
    if (err) throw err;
    if (!workout)
      return {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    return workout;
  });
};

const createNewWorkout = async (data) => {
  // is this callback hell?
  const isWorkoutAlreadyAdded = WorkoutModel.findOne({ name: data.name }).exec(
    (err, found) => err || found
  );
  if (!isWorkoutAlreadyAdded) {
    const createdWorkout = await WorkoutModel.create(
      data,
      (err, workout) => err || workout
    );
    return createdWorkout;
  }
};

const updateOneWorkout = async (workoutId, changes) => {
  await WorkoutModel.findOneAndUpdate(
    { _id: workoutId },
    changes,
    { new: true },
    (err, docs) => err || docs
  );
};

export { getAllWorkouts, getOneWorkout, createNewWorkout, updateOneWorkout };
