const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config(); // Make sure to load the environment variables

const app = express();
const PORT = 3000; // You can set this directly if you're only using it locally

app.use(bodyParser.json());
 
app.post('/api/gpt', async (req, res) => {
    const { model, prompt, max_tokens } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Ensure your .env file has this variable
            },
            body: JSON.stringify({
                model: model || "gpt-3.5-turbo",
                messages: [{ "role": "user", "content": prompt }],
                max_tokens: max_tokens || 100,
                temperature: 0.7
            }),
        });

        const gptResponse = await response.json();
        res.json(gptResponse);
    } catch (error) {
        console.error('Error calling the OpenAI API:', error);
        res.status(500).json({ error: 'Error processing your request' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
