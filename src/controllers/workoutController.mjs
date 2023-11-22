import { validationResult } from "express-validator";
import * as workoutService from "../services/workoutService.mjs";

const getAllWorkouts = (_req, res) => {
  const allWorkouts = workoutService.getAllWorkouts();
  allWorkouts
    .then((value) => res.status(201).json({ status: "OK", data: value }))
    .catch((error) => {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    });
};

// eslint-disable-next-line consistent-return
const getOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ status: "FAILED", errors: errors.array() });
  }
  const workout = workoutService.getOneWorkout(workoutId);
  workout
    .then((value) => res.status(201).send({ status: "OK", data: value }))
    .catch((err) =>
      res
        .status(err?.status || 500)
        .send({ status: "FAILED,", data: { error: err?.message || err } })
    );
};

const createNewWorkout = async (req, res) => {
  const { body } = req;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };

  const workout = await workoutService.createNewWorkout(newWorkout);
  return res.status(201).send({ status: "OK", workout });
};

const updateOneWorkout = async (req, res) => {
  const {
    body,
    params: { workoutId },
  } = req;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({
      status: "FAILED",
      data: {
        errors: errors.array(),
      },
    });
  }
  try {
    const updatedWorkout = await workoutService.updateOneWorkout(
      workoutId,
      body
    );
    return res.send({ status: "OK", data: updatedWorkout });
  } catch (error) {
    return res
      .status(error.status)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ status: "FAILED", data: { error: errors.array() } });
  }
  workoutService.deleteOneWorkout(workoutId);
  res.status(204).send({ status: "OK", message: "Succesfully deleted" });
};

export {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
