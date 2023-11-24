const express = require("express");
// require the usermodel
const mongoose = require("mongoose")
const app = express()

const db_url = "mongodb+srv://MostafaHossam:Minecraft1234@cluster0.c2fztvl.mongodb.net/projData"; 

// ! Mongoose Driver Connection
const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

console.log('here');
mongoose
.connect(db_url, connectionOptions)
.then(() => console.log("mongoDB connected"))
.catch((e) => {
  console.log(e);
});
console.log('here'); 
const User = require("./models/userModel");
const Ticket = require("./models/ticketModel");
const FAQ = require("./models/faqModel");
const Chat = require("./models/chatModel");
const Support_Agent = require("./models/supportAgentModel");
const Workflow = require("./models/workflowsModel");


