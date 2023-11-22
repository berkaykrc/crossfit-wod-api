import { Router } from "express";
import { body, param } from "express-validator";
import {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
} from "../../controllers/workoutController.mjs";

const route = Router();

route.get("/", getAllWorkouts);

route.get(
  "/:workoutId",
  param("workoutId")
    .notEmpty()
    .withMessage("parameter ':workoutId' can not be empty"),
  getOneWorkout
);

route.post(
  "/",
  body("name")
    .isString()
    .notEmpty()
    .withMessage("name can't be empty or consist of numbers."),
  body("equipment").isArray({ min: 1 }).withMessage("equipment can't be empty"),
  body("exercises").isArray({ min: 1 }).withMessage("exercises can't be empty"),
  body("trainerTips")
    .isArray({ min: 1 })
    .withMessage("trainer tips can't be empty or consist of numbers."),
  createNewWorkout
);

route.patch(
  "/:workoutId",
  body("name")
    .isString()
    .notEmpty()
    .withMessage("name can't be empty for update"),
  body("equipment")
    .isArray({ min: 1 })
    .withMessage("equipment can't be empty for update"),
  body("exercises")
    .notEmpty()
    .withMessage("exercises can't be empty for update"),
  body("trainerTips")
    .notEmpty()
    .withMessage("trainer tips can't be empty for update"),
  updateOneWorkout
);

route.delete(
  "/:workoutId",
  param("workoutId")
    .isInt()
    .withMessage("workoutId should be number value")
    .isEmpty()
    .withMessage("parameter ':workoutId' can not be empty"),
  deleteOneWorkout
);

export default route;
