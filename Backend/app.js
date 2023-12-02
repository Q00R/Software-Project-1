const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cors = require("cors");
require('dotenv').config();

const db_url = 'mongodb+srv://MostafaHossam:Minecraft1234@cluster0.c2fztvl.mongodb.net/projData'; 

const knowledgebaseRouter = require("./routes/knowledgebase");

// app.use(
//   cors({
//     origin: process.env.ORIGIN,
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//   })
// );

console.log(db_url)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/knowledgebase", knowledgebaseRouter);


// ! Mongoose Driver Connection
const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
.connect(db_url, connectionOptions)
.then(() => console.log("mongoDB connected"))
.catch((e) => {
  console.log(e);
});

app.use(function (req, res, next) {
  return res.status(404).send("404");
});

app.listen(3000, () => console.log("server started at port " + 3000));