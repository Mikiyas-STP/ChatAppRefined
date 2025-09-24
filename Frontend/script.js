const backendUrl = 'http://localhost:3000'; // The URL of your running server
// Get the container where messages will be displayed
const messagesContainer = document.getElementById('chat-messages');
const messageForm = document.getElementById('message-form');
const usernameInput = document.getElementById('username-input');
const messageInput = document.getElementById('message-input');

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
        //Automatically scroll to the bottom of the chat window
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    catch (error) {
        console.error('Failed to fetch messages:', error);
        messagesContainer.innerHTML = 'Error: Could not load messages.';
    }
}
fetchAndDisplayMessages();

//for sending messages
messageForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const text = messageInput.value;
    if (!username || !text) {
        alert('Please enter both a username and a message.');
        return;
    }
    const newMessage = {
        username: username,
        text: text
    };

    try {
        const response = await fetch(`${backendUrl}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMessage)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        messageInput.value = '';
        fetchAndDisplayMessages();
    } catch (error) {
        console.error('Failed to send message:', error);
        alert('Error: Could not send message.');
    }
});

//polling functionality - i set an interval to fetch messages every 3 sec.
setInterval(fetchAndDisplayMessages, 3000);