const messageList = document.getElementById("message-list");
const messageForm = document.getElementById("message-form");
const usernameInput = document.getElementById("username-input");
const messageInput = document.getElementById("message-input");
const API_URL = "http://localhost:3000";
function createMessageElement(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  const usernameP = document.createElement("p");
  usernameP.classList.add("username");
  usernameP.textContent = message.username;
  const textP = document.createElement("p");
  textP.classList.add("text");
  textP.textContent = message.text;
  div.appendChild(usernameP);
  div.appendChild(textP);
  return div;
}
async function fetchMessages() {
  try {
    const response = await fetch(`${API_URL}/messages`);
    if (!response.ok) {
      throw new Error("Failed to fetch messages.");
    }
    const messages = await response.json();
    messageList.innerHTML = "";
    messages.forEach(message => {
      const messageElement = createMessageElement(message);
      messageList.appendChild(messageElement);
    });
    messageList.scrollTop = messageList.scrollHeight;
  } catch (error) {
    console.error("Error:", error);
    messageList.innerHTML = "<p>Could not load messages.</p>";
  }
}
async function handleFormSubmit(event) {
  event.preventDefault();
  const username = usernameInput.value;
  const text = messageInput.value;
  if (!username || !text) {
    alert("Please enter both a username and a message.");
    return;
  }
  const newMessage = { username, text };
  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    });
    if (!response.ok) {
      throw new Error("Failed to send message.");
    }
    messageInput.value = "";
    fetchMessages(); //re-fetches all messages to show the new one
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Failed to send message. Please try again.");
  }
}
messageForm.addEventListener("submit", handleFormSubmit);
fetchMessages();