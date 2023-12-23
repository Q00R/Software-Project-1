const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// * login

// * register
router.post("/register",userController.register);
router.post("/verifyEmail",userController.verifyEmail);
router.post("/login",userController.login);
router.post("/verifyOTP",userController.verifyOTPLogin);
router.post("/logout",userController.logout);
router.get("/isLoggedIn",userController.isLoggedIn);
// IG these require the user to be logged in atleast --> revise later
router.post("/enableMFA",userController.enableMFA);
router.get('/getUser',userController.getUser);
router.post("/disableMFA",userController.disableMFA);

module.exports = router; // ! Don't forget to export the router