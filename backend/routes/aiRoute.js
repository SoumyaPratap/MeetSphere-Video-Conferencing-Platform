const express = require("express");
const router = express.Router();

const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const completion =
      await client.chat.completions.create({
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "user",
            content: question,
          },
        ],
      });

    const answer =
      completion.choices[0].message.content;

    res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI Error",
    });
  }
});

module.exports = router;