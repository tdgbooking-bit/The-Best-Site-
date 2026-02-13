// Simple Express server to proxy Codex autocomplete requests
const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/codex-autocomplete', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.completions.create({
      model: 'code-davinci-002',
      prompt,
      max_tokens: 50,
      stop: ['\n']
    });
    res.json({ text: response.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`OpenAI Codex proxy server running on http://localhost:${port}`);
});
