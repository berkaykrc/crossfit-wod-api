import express, { json } from "express";
import v1WorkoutRouter from "./v1/routes/workoutRoute.mjs";
import "./config.mjs";

const app = express();
app.use(json());
const PORT = process.env.PORT || 3000;

app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`); // eslint-disable-line no-console
});
