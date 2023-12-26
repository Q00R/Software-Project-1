const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");

router.get("/getRole", authenticationMiddleware, userController.getRole);

router.get("/:id", userController.getUser);

router.post("/register", userController.register);

router.post("/verifyEmail", userController.verifyEmail);

router.post("/login", userController.login)

router.post("/verifyOTP", userController.verifyOTPLogin);

router.post("/logout", userController.logout);

module.exports = router;