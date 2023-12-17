const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController.js')

//admin changing the role of users
router.put('/changeRole', adminController.adminChangeRole);

module.exports = router;