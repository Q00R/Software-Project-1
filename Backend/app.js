const express = require("express");
// require the usermodel
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const authRouter = require("./routes/authentication");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
app.use("/api/v1", authRouter);

const db_url = "mongodb+srv://MostafaHossam:Minecraft1234@cluster0.c2fztvl.mongodb.net/projData"; 


console.log('here');
mongoose
.connect(db_url)
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


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

