const express = require("express");
const cors = require("cors");
const http = require("http"); //Import Node's built-in http module
const { Server } = require("socket.io"); //Import the socket.io
const app = express();
const server = http.createServer(app); //Create an HTTP server from the Express app
//Create a socket.io server and attach it to the http server
// We also configure CORS for socket.io here
const io = new Server(server, {
  cors: {
    origin: "*", // Allow connections from any origin
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
let messages = [
  { username: "System", text: "Welcome to the chat!", timestamp: new Date() },
  {
    username: "TestUser",
    text: "This is the first message.",
    timestamp: new Date(),
  },
];
app.get("/messages", (req, res) => {
  res.json(messages);
});
app.get("/", (req, res) => {
    res.json({message: "it is running",
        endpoint: {
            messages: "/messages",
            WebSocket: "ws://" + req.get("host")
        
    }
})
});
app.post("/messages", (req, res) => {
  const newMessage = {
    username: req.body.username || "Anonymous",
    text: req.body.text,
    timestamp: new Date(),
  };
  if (!newMessage.text) {
    return res.status(400).json({ error: "Message text cannot be empty." });
  }
  messages.push(newMessage);
  //Instead of just saving the message, we now broadcast it to all connected clients.
  io.emit("newMessage", newMessage);
  res.status(201).json(newMessage);
});
// 6. Logic for what happens when a client connects to the socket server
io.on("connection", (socket) => {
  console.log("A user connected with id:", socket.id);
  //Optional Logic for when a client disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
//We listen on the http server, NOT the express app
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
