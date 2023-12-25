const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// * login

// * register
router.post("/register",userController.register);
router.post("/verifyEmail",userController.verifyEmail);

// router.post("/login",userController.login);
router.post("/login2" ,userController.login2)


// router.post("/verifyOTP",userController.verifyOTPLogin);
router.post("/verifyOTP2",userController.verifyOTPLogin2);

router.post("/logout",userController.logout);
// IG these require the user to be logged in atleast --> revise later


module.exports = router; // ! Don't forget to export the router