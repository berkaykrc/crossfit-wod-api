import {mongoose} from 'mongoose';
const DB_URI = process.env.DB_URI
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on("error", (err)=> console.log(err));
db.on("connected", ()=>console.log("connected succ"));
module.exports = db