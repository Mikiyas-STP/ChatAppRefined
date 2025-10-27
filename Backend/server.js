const express = require("express");
const cors = require("cors");
const http = require("http"); //import Node's built-in http module
const { Server } = require("socket.io"); //import the socket.io 
const app = express(); //create express server app
const server = http.createServer(app); //Create an HTTP server from the Express app

//Create a socket.io server and attach it to the http server + configure CORS for socket.io here
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
    username: "Bot",
    text: "Please send a message.",
    timestamp: new Date(),
  },
];

//get data from the backend endpoint
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

//send message/s to the backend endpoint if they exist
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
  //Now broadcast the message which we send to all connected clients instead of just saving it.
  io.emit("newMessage", newMessage);
  res.status(201).json(newMessage);
});

//when a client connects to the socket server
io.on("connection", (socket) => {
  console.log("A user connected with id:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
server.listen(port, () => {
  //We listen on the http server, NOT the express app
  console.log(`Server is listening on port ${port}`);
});