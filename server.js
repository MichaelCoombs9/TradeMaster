import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import OpenAI from 'openai';
import { config } from 'dotenv';
config();

const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable if it's set

// Serve static files from the public_html directory
app.use(express.static(path.join(__dirname, '../public_html')));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/submit-form', async (req, res) => {
  const { selectedPlayersTeam1, selectedPlayersTeam2, userInput } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Team 1: " + selectedPlayersTeam1 + ", Team 2: " + selectedPlayersTeam2 + " Trade Insight: " + userInput }],
    });

    console.log(completion.choices[0].message.content);
    // You can also send a response back to the client, if needed
    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error during API call:", error);
    res.status(500).send("Error processing your request");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




