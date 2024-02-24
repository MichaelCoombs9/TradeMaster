import express from 'express';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import { config } from 'dotenv';
config();

const app = express();
const port = 3000; // You can use any port that's free on your system

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/submit-form', async (req, res) => {
  const { selectedPlayersTeam1, selectedPlayersTeam2, userInput } = req.body;
  // Assuming `userInput` is what you want to send to OpenAI
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userInput }],
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




