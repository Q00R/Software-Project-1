const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// * login
router.post("/initiateLogin",userController.initiateLogin );
router.post("/completeLogin",userController.completeLogin);

// * register
router.post("/register",userController.register);

module.exports = router; // ! Don't forget to export the router