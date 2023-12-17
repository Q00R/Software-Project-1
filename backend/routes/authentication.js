const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// * login

// * register
router.post("/register",userController.register);
router.post("/verifyEmail",userController.verifyEmail);
router.post("/enableMFA",userController.enableMFA);
router.post("/login",userController.login);
router.post("/verifyOTP",userController.verifyOTPLogin);

module.exports = router; // ! Don't forget to export the router