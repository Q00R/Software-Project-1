const express = require("express");
const router = express.Router();
const faqModel = require("../models/faqModel");

//getting all FAQs for a subcategory
router.get('/category/:category', async (req, res) => {
    try{
        const category = req.params.category;
        if (faqModel.schema.path('issue.subIssue').enumValues.includes(category)){
            //returning only id, title, question, and timestamps
            const faqs = await faqModel.find({ 'issue.subIssue': category }).select('_id title question timestamps');
            return res.status('200').json(faqs);
        }
        else{
            return res.status('400').json({ error: 'Invalid category!' });
        }
    } catch (e){
        return res.status('400').json({ error: 'Couldnt retrieve FAQs!' });
    }
});

//getting specific FAQ
router.get('/id/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const faq = await faqModel.findById(id);
        return res.status('200').json(faq);
    } catch (e){
        return res.status('400').json({ error: 'Couldnt retrieve FAQ!' });
    }
});

//getting by a search term
router.get('/search/:term', async (req, res) => {
    try{
        const term = req.params.term;
        const faqs = await faqModel.find({ $text: { $search: term } });
        return res.status('200').json(faqs);
    } catch (e){
        return res.status('400').json({ error: 'Couldnt retrieve FAQs!' });
    }
});

module.exports = router;