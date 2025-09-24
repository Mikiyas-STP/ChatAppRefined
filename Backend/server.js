const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
let messages = [
    { username: 'System', text: 'Welcome to the chat!', timestamp: new Date() },
    { username: 'TestUser', text: 'This is the first message.', timestamp: new Date() }
];
app.get('/messages', (req, res) => {
    res.json(messages);
});
app.post('/messages', (req, res) => {
    const newMessage = {
        username: req.body.username || 'Anonymous',
        text: req.body.text,
        timestamp: new Date()
    };
    if (!newMessage.text) {
        return res.status(400).json({ error: 'Message text cannot be empty.' });
    }

    messages.push(newMessage);
    console.log('New message added:', newMessage);
    res.status(201).json(newMessage);
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
