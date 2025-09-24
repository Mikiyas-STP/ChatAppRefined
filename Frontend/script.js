const backendUrl = 'http://localhost:3000'; // The URL of your running server
// Get the container where messages will be displayed
const messagesContainer = document.getElementById('chat-messages');
// Function to fetch all messages from the server and display them
async function fetchAndDisplayMessages() {
    try {
        const response = await fetch(`${backendUrl}/messages`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const messages = await response.json();
        // Clear any existing messages
        messagesContainer.innerHTML = '';
        // Loop through each message and add it to the display
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            // Format the timestamp to be more readable
            const formattedTimestamp = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            messageElement.innerHTML = `
                <span class="username">${message.username}:</span>
                <span class="text">${message.text}</span>
                <span class="timestamp">${formattedTimestamp}</span>
            `;
            messagesContainer.appendChild(messageElement);
        });
    } catch (error) {
        console.error('Failed to fetch messages:', error);
        messagesContainer.innerHTML = 'Error: Could not load messages.';
    }
}
fetchAndDisplayMessages();