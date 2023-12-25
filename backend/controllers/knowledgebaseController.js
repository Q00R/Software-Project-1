const faqModel = require("../models/faqModel");

const categories = {
    Software: [
        "Operating system",
        "Application software",
        "Custom software",
        "Integration issues"
    ],
    Hardware: [
        "Desktops",
        "Laptops",
        "Printers",
        "Servers",
        "Networking equipment"
    ],
    Network: [
        "Email issues",
        "Internet connection problems",
        "Website errors"
    ]
  };

const knowledgeController = {
    categoryAndSubIssue: async (req, res) => {
        try{
            return res.status(200).json({ categories: categories });
        } catch (e){
            return res.status(400).json({ error: 'Couldnt retrieve categories and sub-issues!' });
        }
    },
    faqsBySubIssue: async (req, res) => {
        try{
            const category = req.params.category;
            if (faqModel.schema.path('subIssue').enumValues.includes(category)){
                //returning only id, title, question, and timestamps
                const faqs = await faqModel.find({ 'subIssue': category }).select('title question solution mainIssue subIssue timestamps');
                return res.status(200).json(faqs);
            }
            else{
                return res.status(400).json({ error: 'Invalid category!' });
            }
        } catch (e){
            return res.status(400).json({ error: 'Couldnt retrieve FAQs!' });
        }
    },
    faqById: async (req, res) => {
        try{
            const id = req.params.id;
            const faq = await faqModel.findById(id);
            return res.status(200).json(faq);
        } catch (e){
            return res.status(400).json({ error: 'Couldnt retrieve FAQ!' });
        }
    },
    faqBySearch: async (req, res) => {
        try{
            const term = req.params.term;
            const faqs = await faqModel.find({$or: [{title: {$regex: '.*'+term+'.*'}}, {question: {$regex: '.*'+term+'.*'}}, {solution: {$regex: '.*'+term+'.*'}}]});
            return res.status(200).json(faqs);
        } catch (e){
            console.log(e);
            return res.status(400).json({ error: 'Couldnt retrieve FAQs!' });
        }
    }
};

module.exports = knowledgeController;