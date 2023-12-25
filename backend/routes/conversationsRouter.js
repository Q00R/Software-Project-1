const router = require("express").Router();
const conversationsController = require('../controllers/conversationsController.js')

//new conv
router.post("/", conversationsController.createConversation);

//get conv of a user
router.get("/:userId", conversationsController.getConversation);

// get conv includes two userId
//router.get("/find/:firstUserId/:secondUserId", );

module.exports = router;
