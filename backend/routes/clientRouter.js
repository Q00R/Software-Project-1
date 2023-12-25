const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authorizationMiddleware");
const clientController = require("../controllers/clientController");

//get workflow for the issue
router.get(
  "/ticketrequest",
  authMiddleware(["client"]),
  clientController.generateWorkflow
);

//post (insert) ticket into db
router.post(
  "/ticketrequest",
  authMiddleware(["client"]),
  clientController.createTicket
);

//get this user's tickets - all
router.get(
  "/tickets",
  authMiddleware(["client"]),
  clientController.getAllTickets
);

//get this user's tickets by main issue
router.get(
  "/tickets/filter/:mainIssue",
  authMiddleware(["client"]),
  clientController.getTicketByMainIssue
);

// rate ticket
router.post(
  "/tickets/rate/:ticketId",
  authMiddleware(["client"]),
  clientController.rateTicket
);

router.get(
  "/getUser",
  authMiddleware(["client", "admin", "agent", "manager"]),
  clientController.getUser
);

router.put(
  "/updateName",
  authMiddleware(["client", "admin", "agent", "manager"]),
  clientController.updateName
);
router.put(
  "/updateUsername",
  authMiddleware(["client", "admin", "agent", "manager"]),
  clientController.updateUsername
);
router.put(
  "/updateEmail",
  authMiddleware(["client", "admin", "agent", "manager"]),
  clientController.updateEmail
);
router.put(
  "/updateDOB",
  authMiddleware(["client", "admin", "agent", "manager"]),
  clientController.updateDOB
);
router.put(
  "/updateAddress",
  authMiddleware(["client", "admin", "agent", "manager"]),
  clientController.updateAddress
);
router.put(
  "/changePassword",
  authMiddleware(["client", "admin", "agent", "manager"]),
  clientController.changePassword
);

module.exports = router;
