const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");


// get a user from db by id
router.get("/:id", userController.getUser);
// * login

// * register
router.post("/register", userController.register);
router.post("/verifyEmail", userController.verifyEmail);

// router.post("/login",userController.login);
router.post("/login", userController.login)

router.post("/verifyOTP",userController.verifyOTPLogin);

router.post("/logout", userController.logout);
// IG these require the user to be logged in atleast --> revise later


module.exports = router; // ! Don't forget to export the router