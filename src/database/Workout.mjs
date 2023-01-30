import WorkoutModel from "./WorkoutModel.mjs";

const getAllWorkouts = () => {
  const allWorkouts = WorkoutModel.find();
  return allWorkouts;
};

const getOneWorkout = async (workoutId) => {
  const foundWorkout = await WorkoutModel.findById(
    workoutId)
  return foundWorkout;
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

const updateOneWorkout = (workoutId, changes) => {
  WorkoutModel.findOneAndUpdate(
    { _id: workoutId },
    changes,
    { new: true },
    (err, docs) => err || docs
  );
};

export { getAllWorkouts, getOneWorkout, createNewWorkout, updateOneWorkout };
