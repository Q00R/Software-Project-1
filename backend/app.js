const express = require("express");
const cookieParser = require('cookie-parser')
const app = express();
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require('dotenv').config();
const authorizationMiddleware = require("./middleware/authorizationMiddleware");
const authenticationMiddleware = require("./middleware/authenticationMiddleware");
const backupDatabaseController = require("./controllers/dbBackupController")
const authRouter = require("./routes/authentication");
const agentRouter = require("./routes/agentRouter");
const knowledgebaseRouter = require("./routes/knowledgebaseRouter");
const adminRouter = require("./routes/adminRouter");
const clientRouter = require("./routes/clientRouter");
const managerRouter = require("./routes/managerRouter");
const conversationsRouter = require("./routes/conversationsRouter");
const messagesRouter = require("./routes/messagesRouter");
const openai = require("./routes/openai");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
  })
);

// ! Mongoose Driver Connection
const db_name = process.env.DB_NAME;
const db_url = `${process.env.DB_URL}/${db_name}`;

mongoose
  .connect(db_url)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => {
    console.log(e);
  });
  
//Printing the response status and response json
app.use((req, res, next) => {
  const oldSend = res.send;
  res.send = function (data) {
    console.log(res.statusCode, data);
    oldSend.apply(res, arguments);
  };
  console.log(req.method, req.url, req.headers.cookie);
  next();
});

// Routes
app.use("/api/v1", authRouter);
app.use(authenticationMiddleware);
app.use("/openai", openai);
app.use("/conversations", conversationsRouter);
app.use("/messages", messagesRouter);
app.use("/knowledgebase", authorizationMiddleware(['agent','admin','client']), knowledgebaseRouter);
app.use("/agent", authorizationMiddleware(['agent']), agentRouter);
app.use("/admin", authorizationMiddleware(['admin']), adminRouter);
app.use("/client", authorizationMiddleware(['client', 'admin', 'agent']), clientRouter);
app.use("/manager",authorizationMiddleware(['manager']), managerRouter);


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

const server = http.createServer(app);

const io = new Server(server, {
  cors: ({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
  }),
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    try {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
    catch (e) { }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
  });
});

server.listen(process.env.PORT, () => console.log("server started", process.env.PORT));