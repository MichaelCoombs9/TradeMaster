const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors()); // This line enables CORS middleware

// Correct port variable used
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define the endpoint '/api/gpt'
app.post('/api/gpt', async (req, res) => {
    const fetch = require('node-fetch'); // Require node-fetch here

    const { model, prompt, max_tokens } = req.body;

    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Accessing the API key from environment variables
        },
        body: JSON.stringify({
            model: model || "gpt-4",
            prompt: prompt,
            max_tokens: max_tokens || 100,
        }),
    });
    const gptResponse = await response.json();
    res.json(gptResponse);
});

// Remove the redundant app.listen call

// Correct usage of PORT variable
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
