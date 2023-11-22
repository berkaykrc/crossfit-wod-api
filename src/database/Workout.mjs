import WorkoutModel from "./WorkoutModel.mjs";

const getAllWorkouts = () => {
  const allWorkouts = WorkoutModel.find();
  return allWorkouts;
};

const getOneWorkout = async (workoutId) => {
  const foundWorkout = await WorkoutModel.findById(workoutId);
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

const updateOneWorkout = async (workoutId, changes) => {
  try {
    const updatedWorkout = await WorkoutModel.findOneAndUpdate(
      { _id: workoutId },
      changes,
      { new: true }
    );
    if (updatedWorkout) {
      return updatedWorkout;
    }
    throw Error({
      status: 500,
      message: `Cannot find workout with ${workoutId}`,
    });
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    throw {
      status: error?.status || 500,
      message: error?.message || `Cannot find workout with ${workoutId}`,
    };
  }
};

export { getAllWorkouts, getOneWorkout, createNewWorkout, updateOneWorkout };
