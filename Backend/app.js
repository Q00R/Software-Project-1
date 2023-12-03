const express = require("express");
const cookieParser=require('cookie-parser')
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const authRouter = require("./Routes/authentication");
const agentRouter = require("./Routes/agent");
const userRouter = require("./Routes/user");
const knowledgebaseRouter = require("./Routes/knowledgebase");
const managerRouter = require("./Routes/manager");

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

const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
// Routes

mongoose
.connect(db_url, connectionOptions)
.then(() => console.log("mongoDB connected"))
.catch((e) => {
  console.log(e);
});

app.use("/api/v1", authRouter);
app.use("/user", userRouter);
app.use("/agent", agentRouter);
app.use("/knowledgebase", knowledgebaseRouter);
app.use("/manager",managerRouter);

app.use(function (req, res, next) {
  return res.status(404).send("404");
});
app.listen(process.env.PORT, () => console.log("server started"));
