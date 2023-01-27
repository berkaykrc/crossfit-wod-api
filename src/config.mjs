/* eslint-disable no-console */
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const { DB_URI } = process.env
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.on("connected", () => console.log("connected succ"));
export default db;
