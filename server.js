const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Correct port variable used
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define the endpoint '/api/gpt'
app.post('/api/gpt', async (req, res) => {
    // Dynamically import node-fetch only if necessary. If you're using a version of Node that supports top-level await, you can keep this.
    // Otherwise, consider requiring node-fetch at the top if you're consistently encountering issues with dynamic imports.
    const fetch = (await import('node-fetch')).default;

    const { model, prompt, max_tokens } = req.body; // Assuming you're sending these details from the client

    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Make sure to use an environment variable for your API key, not hardcode it
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: model || "text-davinci-002", // Default model if not specified
            prompt: prompt, // Use the prompt from the request
            max_tokens: max_tokens || 100, // Default max_tokens if not specified
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
