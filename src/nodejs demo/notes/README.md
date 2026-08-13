# Note Keeper Application

## Overview
A simple CRUD (Create, Read, Update, Delete) Note Keeping application built with **Express.js** and **EJS** templating engine.

---

## 📋 What This Application Does

### Backend (app.js)
- **Framework**: Express.js - A lightweight Node.js web server framework
- **Middleware**: body-parser - Parses incoming request data from forms
- **Features**:
  - Stores notes in a JavaScript array (in-memory storage)
  - Routes for all CRUD operations
  - Renders dynamic HTML templates with note data

### Frontend (home.ejs)
- **Template Engine**: EJS - Embedded JavaScript templating
- **Features**:
  - Displays all saved notes in a grid layout
  - Edit form for each note
  - Delete button for each note
  - Form to add new notes

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** installed on your system
- **npm** (comes with Node.js)

### Step 1: Navigate to Project Directory
```bash
cd notes
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- `express` - Web server framework
- `body-parser` - Middleware for parsing request bodies
- `ejs` - Template engine
- `nodemon` (dev dependency) - Auto-restarts server on file changes

---

## 🚀 Running the Application

### Option 1: Normal Run
```bash
npm start
```

### Option 2: Development Mode (with auto-restart)
```bash
npm run dev
```

### Step 3: Open in Browser
```
http://localhost:3000
```

---

## 📝 Application Features

### 1. **View Notes** (GET /)
- Displays all saved notes when you open the app
- Each note shows in a separate card
- Initial note: "Hey, Prasunamba you can add your important notes here."

### 2. **Add Note** (POST /)
- Fill the "Add Note" textarea at the bottom
- Click "Add" button
- New note gets added to the list
- Page automatically refreshes to show the new note

### 3. **Update Note** (POST /update)
- Each note has an "Update" form
- Edit the note text in the textarea
- Click "Update" button
- Changes are saved and page refreshes

### 4. **Delete Note** (POST /delete)
- Each note has a delete button (X symbol)
- Click the X to remove the note
- Note is deleted from the list
- Page refreshes to show remaining notes

---

## 📂 File Structure

```
notes/
├── app.js                    # Express server (backend logic)
├── package.json             # Project dependencies
├── views/
│   └── home.ejs            # EJS template (frontend display)
└── README.md               # This file
```

---

## 🔧 Code Structure Explanation

### app.js - Backend Server
```javascript
const express = require('express');          // Import Express
const bodyParser = require('body-parser');   // Import body-parser

const notes = [{...}];                        // Data storage (array of notes)
const app = express();                        // Create Express app
app.set('view engine', 'ejs');               // Set template engine
app.use(bodyParser.json());                   // Add middleware
app.use(bodyParser.urlencoded({...}));       // Add middleware

app.get("/", ...);                           // Handle home page view
app.post("/", ...);                          // Handle add note
app.post("/update", ...);                    // Handle update note
app.post("/delete", ...);                    // Handle delete note
app.listen(3000, ...);                       // Start server on port 3000
```

### home.ejs - Frontend Template
```html
<% data.forEach(element=> { %>              // Loop through notes
   <!-- Display each note -->
<% }) %>                                      // End loop

<!-- Form to add new note -->
<form action="/" method="post">...
```

---

## 🎯 How It Works

### Complete User Flow:

1. **User Opens App**
   - Browser sends GET request to `http://localhost:3000`
   - Server runs: `app.get("/", ...)`
   - Sends `notes` array to `home.ejs`
   - EJS renders HTML with all notes

2. **User Adds a Note**
   - Types text in "Add Note" textarea
   - Clicks "Add" button
   - Form POSTs to `/` route
   - Server runs: `app.post("/", ...)`
   - New note added to `notes` array
   - Page re-renders with new note

3. **User Updates a Note**
   - Edits text in note's textarea
   - Clicks "Update" button
   - Form POSTs to `/update` route
   - Server finds note by ID and updates content
   - Page re-renders with updated note

4. **User Deletes a Note**
   - Clicks X button on a note
   - Form POSTs to `/delete` route
   - Server removes note from array
   - Page re-renders without deleted note

---

## ⚙️ Technical Details

### Routing
- `GET /` → Display all notes (render home page)
- `POST /` → Add new note (form submission)
- `POST /update` → Update existing note (form submission)
- `POST /delete` → Delete a note (form submission)

### Data Format
Each note object contains:
```javascript
{
  noteId: 1,                          // Unique identifier
  noteContent: "Your note text here"  // Note content
}
```

### Note ID Generation
```javascript
const noteId = notes.length + 1;  // ID = array length + 1
```

---

## 💡 Important Notes

- **In-Memory Storage**: Notes are stored in a JavaScript array in memory. When the server restarts, all notes are lost. (For persistent storage, use a database like MongoDB or MySQL)
- **Single User**: This app doesn't have user authentication. All notes are shared.
- **No Validation**: The app doesn't validate note content (e.g., empty notes can be added)

---

## 🔄 Middleware Explained

### body-parser
- Middleware that parses incoming request bodies
- `bodyParser.json()` - Handles JSON data
- `bodyParser.urlencoded()` - Handles HTML form data
- `extended: true` - Allows complex data structures

---

## 🛠️ Troubleshooting

### App doesn't start
```
Error: Cannot find module 'express'
Solution: Run 'npm install'
```

### Port already in use
```
Error: listen EADDRINUSE: address already in use :::3000
Solution: Change the port number in app.js or close the process using port 3000
```

### Template not found
```
Error: ENOENT: no such file or directory, open '.../views/home.ejs'
Solution: Make sure home.ejs is in the 'views' folder
```

---

## 📚 Learning Resources

- **Express.js Documentation**: https://expressjs.com/
- **EJS Documentation**: https://ejs.co/
- **Body-Parser Documentation**: https://github.com/expressjs/body-parser
- **Node.js Documentation**: https://nodejs.org/

---

## 📝 Summary

This is a beginner-friendly CRUD application that demonstrates:
- ✅ Creating a web server with Express.js
- ✅ Using middleware to parse form data
- ✅ Server-side rendering with EJS
- ✅ Handling HTTP routes (GET, POST)
- ✅ Working with data in memory
- ✅ Basic CRUD operations
- ✅ Form handling and data manipulation

Perfect for learning full-stack web development basics!

---

**Happy Note Taking!** 📝✨
