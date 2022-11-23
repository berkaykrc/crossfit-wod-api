import {workoutUtils} from "../database/Workout.mjs"

const getAllWorkouts = () => {
    try {
        const allWorkouts = workoutUtils.getAllWorkouts()
        return allWorkouts;
    } catch (error) {
        console.log(error)
    }
}

const getOneWorkout = (workoutId) => {
    try {
        const workout = workoutUtils.getOneWorkout(workoutId)
        return workout;
    } catch (error) { console.log(error) }
};

const createNewWorkout = async (data) => {
    try {
        const createdWorkout = workoutUtils.createNewWorkout(data)
        return createdWorkout
    } catch (error) { console.log(error) }
};

const updateOneWorkout = (workoutId, changes) => {
    try {
        const updatedWorkout = workoutUtils.updateOneWorkout(workoutId, changes);
        return updatedWorkout;
    } catch (error) { console.log(error) }
};

const deleteOneWorkout = (workoutId) => {
    try {
        workoutUtils.deleteOneWorkout(workoutId);
    } catch (error) { console.log(error) }
};

export const workoutService = {createNewWorkout,updateOneWorkout,deleteOneWorkout,getOneWorkout,getAllWorkouts}