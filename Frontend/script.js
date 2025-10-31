//Environment Aware Backend URL
let backendUrl;
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  backendUrl = "http://localhost:3000";
  console.log("Running in local mode. Using local backend.");
} else {
  backendUrl =
    "https://mikiyas-stp-chatapp-refined-backend.hosting.codeyourfuture.io";
  console.log("Running in deployed mode. Using live backend.");
}
const messagesContainer = document.getElementById("chat-messages");
const messageForm = document.getElementById("message-form");
const usernameInput = document.getElementById("username-input");
const messageInput = document.getElementById("message-input");
const socket = io(backendUrl);     //connect to the websocket server

//Function to add a single message to the chat window
function addMessageToChat(message) {

  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  const usernameSpan = document.createElement("span");
  usernameSpan.classList.add("username");
  usernameSpan.textContent = message.username + ":"; 
  const textSpan = document.createElement("span");
  textSpan.classList.add("text");
  textSpan.textContent = message.text;
  const timestampSpan = document.createElement("span");
  timestampSpan.classList.add("timestamp");
  const formattedTimestamp = new Date(message.timestamp).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  timestampSpan.textContent = formattedTimestamp;

  messageElement.appendChild(usernameSpan);
  messageElement.appendChild(textSpan);
  messageElement.appendChild(timestampSpan);

  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;



}
//helper function to fetch initial messages from backend
async function fetchInitialMessages() {
  try {
    const response = await fetch(`${backendUrl}/messages`);
    const messages = await response.json();
    messagesContainer.innerHTML = "";
    messages.forEach((message) => {
      addMessageToChat(message);
    });
  } catch (error) {
    console.error("Failed to fetch initial messages:", error);
    messagesContainer.innerHTML = "Error: Could not load messages.";
  }
}









//Form eventlistener on submit
messageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = usernameInput.value;
  const text = messageInput.value;
  if (!username || !text) {
    alert("Please enter both a username and a message.");
    return;
  }
  const newMessage = { username, text };
  try {
    await fetch(`${backendUrl}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    });
    messageInput.value = ""; // Just clear the input field.
  } catch (error) {
    console.error("Failed to send message:", error);
    alert("Error: Could not send message.");
  }
});

//Listening for the 'newMessage' event broadcast by the server
socket.on("newMessage", (message) => {
  addMessageToChat(message); // When we get a new message, we add it to the chat.
});
//when the page open, call the initial messages
fetchInitialMessages();
