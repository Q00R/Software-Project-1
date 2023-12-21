const express = require("express");
const cookieParser=require('cookie-parser')
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const authorizationMiddleware = require("./middleware/authorizationMiddleware");
const authenticationMiddleware = require("./middleware/authenticationMiddleware");
const backupDatabaseController = require("./controllers/dbBackupController")
const authRouter = require("./routes/authentication");
const agentRouter = require("./routes/agent");
const knowledgebaseRouter = require("./routes/knowledgebaseRouter");
const adminRouter = require("./routes/adminRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(cookieParser())

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

const db_name = process.env.DB_NAME;
const db_url = `${process.env.DB_URL}/${db_name}`;


// ! Mongoose Driver Connection

// Routes

mongoose
.connect(db_url)
.then(() => console.log("mongoDB connected"))
.catch((e) => {
  console.log(e);
});

app.use("/api/v1", authRouter);
app.use("/agent", authorizationMiddleware(['agent']), agentRouter);
app.use("/knowledgebase", knowledgebaseRouter);
app.use("/admin", authorizationMiddleware(['admin']), adminRouter);




app.use(function (req, res, next) {
  return res.status(404).send("404");
});

const schedule = require('node-schedule');
//Run every midnight
//The first 0 represents the minute (0-59).
//The second 0 represents the hour (0-23).
//The third 0 represents the day of the month.
//The fourth 0 represents the month.
//The fifth 0 represents the day of the week.
const scheduledJob = schedule.scheduleJob('0 0 * * *', () => {
  backupDatabaseController.updateDatabaseBackup();
  console.log("Database Backed Up Successfully!")
});

app.listen(process.env.PORT, () => console.log("server started"));

