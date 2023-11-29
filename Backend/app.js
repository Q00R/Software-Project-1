const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cors = require("cors");
require('dotenv').config();

const db_url = process.env.DB_URL + process.env.DB_NAME; 

const knowlagebaseRouter = require("./routes/knowlagebase");

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

app.use("/knowlagebase", knowlagebaseRouter);


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
app.listen(process.env.PORT, () => console.log("server started at port " + process.env.PORT));