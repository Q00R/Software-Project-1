const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// * login

// * register
router.post("/register",userController.register);
router.post("/verifyOTP",userController.verifyOTP);
router.post("/enableMFA",userController.enableMFA);
router.post("/login",userController.login);

module.exports = router; // ! Don't forget to export the router