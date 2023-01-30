/* eslint-disable no-console */
import * as workoutUtils from "../database/Workout.mjs";

const getAllWorkouts = () => {
  const allWorkouts = workoutUtils.getAllWorkouts();
  return allWorkouts;
};

const getOneWorkout = (workoutId) => {
  const workout = workoutUtils.getOneWorkout(workoutId);
  return workout;
};

const createNewWorkout = (data) => {
  const createdWorkout = workoutUtils.createNewWorkout(data);
  return createdWorkout;
};

const updateOneWorkout = (workoutId, changes) => {
  const updatedWorkout = workoutUtils.updateOneWorkout(workoutId, changes);
  return updatedWorkout;
};

const deleteOneWorkout = (workoutId) => {
  workoutUtils.deleteOneWorkout(workoutId);
};

export {
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
  getOneWorkout,
  getAllWorkouts,
};
