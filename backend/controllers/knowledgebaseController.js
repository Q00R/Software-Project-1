const faqModel = require("../models/faqModel");

const knowledgeController = {
    faqsBySubIssue: async (req, res) => {
        try{
            const category = req.params.category;
            if (faqModel.schema.path('subIssue').enumValues.includes(category)){
                //returning only id, title, question, and timestamps
                const faqs = await faqModel.find({ 'subIssue': category }).select('_id title question timestamps');
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