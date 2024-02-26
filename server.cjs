const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Use Express's built-in middleware to parse JSON bodies
app.use(express.json());

// RECEIVE FROM ZAPIER
app.post('/receive-data', (req, res) => {
  const chatGPTResponse = req.body.chatGPTResponse;
  
  console.log('Received data from Zapier:', chatGPTResponse);

  // Send update to all connected clients
  if (global.clients) {
    global.clients.forEach(sendEvent => sendEvent({ message: chatGPTResponse }));
  }

  res.json({ success: true, message: 'Data received successfully' });
});

// SENDING RESPONSE TO SCRIPT.JS
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Send a welcome event
  sendEvent({ message: 'Connected to the server for updates.' });

  // Add this sendEvent function to a global list of clients
  global.clients = global.clients || [];
  global.clients.push(sendEvent);

  // Handle client disconnecting
  req.on('close', () => {
    global.clients = global.clients.filter(fn => fn !== sendEvent);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 