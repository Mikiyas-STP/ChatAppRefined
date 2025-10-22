//Environment Aware Backend URL
let backendUrl;
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    backendUrl = 'http://localhost:3000';
    console.log('Running in local mode. Using local backend.');
} else {
    backendUrl = 'https://mikiyas-stp-chatapp-refined-backend.hosting.codeyourfuture.io';
    console.log('Running in deployed mode. Using live backend.');
}
const messagesContainer = document.getElementById('chat-messages');
const messageForm = document.getElementById('message-form');
const usernameInput = document.getElementById('username-input');
const messageInput = document.getElementById('message-input');
//Connect to the WebSocket server (this line is correct from your code)
const socket = io(backendUrl);
//This function just adds a single message to the chat window.
function addMessageToChat(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    const formattedTimestamp = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    messageElement.innerHTML = `
        <span class="username">${message.username}:</span>
        <span class="text">${message.text}</span>
        <span class="timestamp">${formattedTimestamp}</span>
    `;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
async function fetchInitialMessages() {
    try {
        const response = await fetch(`${backendUrl}`);
        const messages = await response.json();
        
        messagesContainer.innerHTML = '';
        messages.forEach(message => {
            addMessageToChat(message);
        });

    } catch (error) {
        console.error('Failed to fetch initial messages:', error);
        messagesContainer.innerHTML = 'Error: Could not load messages.';
    }
}
messageForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const text = messageInput.value;
    if (!username || !text) {
        alert('Please enter both a username and a message.');
        return;
    }
    const newMessage = { username, text };
    try {
        await fetch(`${backendUrl}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMessage)
        });
        messageInput.value = ''; // Just clear the input field.
    } catch (error) {
        console.error('Failed to send message:', error);
        alert('Error: Could not send message.');
    }
});
// We listen for the 'newMessage' event broadcast by the server.
socket.on('newMessage', (message) => {
    addMessageToChat(message); // When we get a new message, we add it to the chat.
});
// REMOVED! The polling is no longer needed.
// setInterval(fetchAndDisplayMessages, 3000);
// Call the function to load the initial chat history when the page opens.
fetchInitialMessages();