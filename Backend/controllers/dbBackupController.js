// const mongoose = require("mongoose");
// const ticketForm = require("./clientController");
// const UserOTPVerification = require("../models/UserOTPVerificationModel");
// const chatModel = require("../Models/chatModel");
// const faqModel = require("../Models/faqModel");
// const sessionModel = require("../Models/sessionModel");
// const supportAgentModel = require("../Models/supportAgentModel");
// const ticketModel = require("../Models/ticketModel");
// const userModel = require("../models/userModel");
// const userOTPModel = require("../models/UserOTPVerificationModel");
// const workflowsModel = require("../models/workflowsModel");

// const dbBackup = {
//   //loops around all the users' dependencies (ticketModel,userModel,OTPverficationModel)
//   createUserBackup: async (req, res) => {
//     try {
//       const userId = req.body.userId;
//       if (!userId) {
//         return res.status(400).json({ error: "No userId provided!" });
//       }
//       const user = await userModel.find({ _id: userId });
//       const userTickets = await ticketModel.find({ userId: userId });
//       const userOTP = await userOTPModel.find({ userId: userId });
//     } catch (e) {
//       return res.status(400).json({ error: "Could not retrieve backups!" });
//     }
//   },
//   createDatabaseBackup: async (req, res) => {
//     try {
//       const chatModelData = await chatModel.find();
//       const faqModelData = await faqModel.find();
//       const sessionModelData = await sessionModel.find();
//       const supportAgentModelData = await supportAgentModel.find()
//       const ticketModelData = await ticketModel.find();
//       const userModelData = await userModel.find();
//       const userOTPModelData = await UserOTPVerificationModel.find();
//       const workflowsModelData = await workflowsModel.find();

//       const db_name = process.env.BACKUP_DB_NAME;
//       const db_url = `${process.env.DB_URL}/${db_name}`;
//       mongoose
//         .connect(db_url, connectionOptions)
//         .then(() => console.log("mongoDB connected"))
//         .catch((e) => {
//           console.log(e);
//         });

      
//     } catch (e) {
//       return res.status(400).json({ error: "Could not retrieve backups!" });
//     }
//   },
// };

// module.exports = dbBackup;
