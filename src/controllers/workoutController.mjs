import  {workoutService} from "../services/workoutService.mjs"
import { validationResult } from 'express-validator';

const getAllWorkouts = (_req, res) => {
    try {
        const allWorkouts = workoutService.getAllWorkouts();
        res.status(201).send({ status: "OK", data: allWorkouts });

    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } })
    }
};

const getOneWorkout = (req, res) => {
    const {
        params: { workoutId },
    } = req
    if (!workoutId) {
        return;
    }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({ status: "FAILED", errors: errors.array() })
    }
    const workout = workoutService.getOneWorkout(workoutId)
    res.status(201).send({ status: "OK", data: workout })
}

const createNewWorkout = async (req, res) => {

    const { body } = req
    const errors = validationResult(req);

    /*const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips,
    };*/

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    } else {

        const newWorkout = {
            name: body.name,
            mode: body.mode,
            equipment: body.equipment,
            exercises: body.exercises,
            trainerTips: body.trainerTips,
        };

        const workout = workoutService.createNewWorkout(newWorkout)
        res.status(201).send({ status: "OK", workout });
    }
};

const updateOneWorkout = (req, res) => {
    const { body, params: { workoutId } } = req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send({
            status: "FAILED",
            data: {
                errors: errors.array()
            }
        });
    }
    try {
        const updatedWorkout = workoutService.updateOneWorkout(workoutId, body)
        res.send({ status: "OK", data: updatedWorkout });

    } catch (error) {
        res
            .status(error)
            .send({ status: "FAILED", data: { error: error?.message || error } })
    }
};

const deleteOneWorkout = (req, res) => {
    const { params: { workoutId } } = req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400)
            .send({ status: "FAILED", data: { error: errors.array() } })
    }
    workoutService.deleteOneWorkout(workoutId)
    res.status(204).send({ status: "OK", message: "Succesfully deleted" });
};

export {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
}