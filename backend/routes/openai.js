const router = require("express").Router();
const OpenAI = require("openai");
require('dotenv').config();

router.get("/:question", async (req, res) => {

    const openai = new OpenAI(process.env.OPENAI_API_KEY);

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: req.params.question }],
            model: "gpt-3.5-turbo",
        });

        //console.log(completion.choices[0]);
        return res.status(200).json(completion.choices[0].message.content);
    } catch (error) {
        return res.status(500).json({ errorMessage: "there was an error woth openai" });
    }

});


module.exports = router;