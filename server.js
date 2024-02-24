const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define the endpoint '/api/gpt'
app.post('/api/gpt', async (req, res) => {

    // Dynamically import node-fetch
    const fetch = (await import('node-fetch')).default;

    // Now use fetch as before
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            model: "text-davinci-002",
            prompt: `Your prompt here`,
            max_tokens: 100,
        }),
    });
    const gptResponse = await response.json();
    res.json(gptResponse);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
