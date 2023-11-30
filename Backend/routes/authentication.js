const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// * login

// * register
router.post("/register",userController.register);
router.post("/verifyOTP",userController.verifyOTP);

module.exports = router; // ! Don't forget to export the router