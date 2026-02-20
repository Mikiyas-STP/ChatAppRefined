# ChatApp

A real-time chat application with added functionality and improvements over the base version.

Repository: https://github.com/Mikiyas-STP/ChatAppRefined

---

## 🧠 About

ChatAppRefined is a full-stack chat app with separate **Frontend** and **Backend** codebases.  
It builds on a classic chat application idea with added features, better structure, and clearer separation of concerns.

---

## 🛠 Tech Stack

| Part | Technology |
|------|------------|
| Frontend | JavaScript, HTML, CSS |
| Backend | Node.js  |
| Communication | WebSockets |
| UI | Vanilla JS |

*Exact versions and libraries are defined in the respective `package.json` files in the frontend and backend.*

---

## 📁 Project Structure

```

ChatAppRefined/
├─ .vscode/
├─ Backend/      # Server API + chat logic
├─ Frontend/     # Client UI
├─ .gitignore
└─ README.md

````

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14+ recommended)
- **npm** or **yarn**

---

### 🔧 Install & Run Backend

1. Open a terminal and go into the Backend folder:

   ```bash
   cd Backend
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   npm run dev
   ```

   *(Or use `npm start` if you have a production script configured.)*

---

### 🌐 Install & Run Frontend

1. Open a new terminal and go into the Frontend folder:

   ```bash
   cd Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser:

   ```
   http://localhost:3000
   ```

---

## 📦 Features (expected / typical for this app)

✔ Real-time chat interface
✔ Separate frontend & backend projects
✔ Structured for future features
✔ Possible WebSocket or REST-based messaging

(*Add features here as you implement them — e.g., typing indicator, message persistence, rooms, user auth, etc.*)

---

## 📌 Environment Variables

If your backend requires configuration (e.g., ports, database URLs), include a `.env` file in **Backend/** with entries like:

```
PORT=5000
DB_URL=your_database_url
SECRET_KEY=your_secret
```

*(Adjust based on your actual backend code.)*

---

## 🧑‍💻 Author

**Mikiyas-STP**
London, United Kingdom
Software developer building full-stack applications.
````
