const router = require("express").Router();
const conversationsController = require('../controllers/conversationsController.js')
const authorizationMiddleware = require("../middleware/authorizationMiddleware");


//get agent by issue type
router.get("/agentFindUid/:mainIssue", authorizationMiddleware(['agent','admin','client']),conversationsController.getAgentByIssue);
//new conv
router.post("/", conversationsController.createConversation);
//get agent username
router.get("/getUsername/:id", conversationsController.getUsername);
//get conv of a user
router.get("/", conversationsController.getConversation);

// get conv includes two userId
//router.get("/find/:firstUserId/:secondUserId", );

module.exports = router;
