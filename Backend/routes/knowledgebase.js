const express = require("express");
const router = express.Router();
const knowledgebaseController = require('../controllers/knowledgebaseController.js')

//getting all FAQs for a subcategory
router.get('/category/:category', knowledgebaseController.faqsBySubIssue);

//getting specific FAQ
router.get('/id/:id', knowledgebaseController.faqById);

//getting by a search term
router.get('/search/:term', knowledgebaseController.faqBySearch);

module.exports = router;