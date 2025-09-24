const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allows requests from our frontend
app.use(express.json()); // Allows us to parse JSON in request bodies

const messages = [
  {
    id: 1,
    username: "ChatBot",
    text: "Welcome to the chat! Feel free to send a message.",
    timestamp: new Date()
  }
];
let nextId = 2; // To assign unique IDs to new messages

// --- API Endpoints ---
// Requirement 2: As a user, I can see all messages when I open the chat.
app.get("/messages", (req, res) => {
  res.json(messages);
});

// Requirement 1: As a user, I can send a message to the chat.
app.post("/messages", (req, res) => {
  const { username, text } = req.body;

  // Basic validation
  if (!username || !text || username.trim() === '' || text.trim() === '') {
    return res.status(400).json({ error: "Username and text are required." });
  }
  const newMessage = {
    id: nextId++,
    username: username.trim(),
    text: text.trim(),
    timestamp: new Date()
  };
  messages.push(newMessage);
  res.status(201).json(newMessage); // Respond with the message that was created
});

// Serve the frontend files
// This assumes your 'frontend' folder is one level up from 'backend'
app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(port, () => {
  console.log(`Chat server running at http://localhost:${port}`);
});