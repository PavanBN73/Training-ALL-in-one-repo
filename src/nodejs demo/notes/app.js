// ====================================
// NOTE KEEPER APP - SERVER FILE (app.js)
// ====================================
// This is an Express.js backend application that manages a collection of notes
// Users can CREATE, READ, UPDATE, and DELETE notes (CRUD operations)

// ====================================
// 1. REQUIRED MODULES/DEPENDENCIES
// ====================================
const express = require('express');        // Express framework for building web server
const bodyParser = require('body-parser');  // Middleware to parse incoming request bodies

// ====================================
// 2. INITIALIZE DATA - NOTES ARRAY
// ====================================
// This array stores all the notes in memory
// Each note has:
//   - noteId: unique identifier for the note
//   - noteContent: the actual text content of the note
const notes = [{
   noteId: 1,
   noteContent: "Hey, Prasunamba you can add your important notes here."
}];

// ====================================
// 3. CREATE EXPRESS APPLICATION
// ====================================
const app = express();

// ====================================
// 4. CONFIGURE VIEW ENGINE
// ====================================
// Set EJS (Embedded JavaScript Templating) as the template engine
// This allows us to render dynamic HTML pages with data
app.set('view engine', 'ejs');

// Set the views directory where EJS template files are stored
// Express will look for templates in the 'views' folder
app.set('views', __dirname + '/views');

// ====================================
// 5. CONFIGURE MIDDLEWARE
// ====================================
// Middleware to parse incoming request bodies

// Parse JSON data from requests
app.use(bodyParser.json());

// Parse URL-encoded form data (like HTML form submissions)
// extended: true allows for rich objects and arrays to be encoded
app.use(bodyParser.urlencoded({
   extended: true
}));

// ====================================
// 6. ROUTE 1: GET "/" - Display All Notes
// ====================================
// HTTP GET request to home page
// Purpose: Render the home page with all existing notes
// req: request object (contains data from the client)
// res: response object (used to send data back to the client)
app.get("/", function (req, res) {
   // Render the "home" template (home.ejs file)
   // Pass the notes array as 'data' to the template
   res.render("home", {
       data: notes  // This data will be available in the EJS template
   });
});

// ====================================
// 7. ROUTE 2: POST "/" - Add New Note
// ====================================
// HTTP POST request to home page
// Purpose: Add a new note to the notes array
app.post("/", (req, res) => {
   // Get the note content from the form submission
   // req.body.noteContent comes from the textarea with name="noteContent"
   const noteContent = req.body.noteContent;
   
   // Generate a new noteId by adding 1 to the current array length
   // This ensures each note has a unique ID
   const noteId = notes.length + 1;
   
   // Create a new note object and add it to the notes array
   notes.push({
       noteId: noteId,
       noteContent: noteContent
   });
   
   // Re-render the home page with the updated notes array
   res.render("home", {
       data: notes
   });
});

// ====================================
// 8. ROUTE 3: POST "/update" - Update Existing Note
// ====================================
// HTTP POST request to /update endpoint
// Purpose: Modify the content of an existing note
app.post('/update', (req, res) => {
   // Get the noteId and new noteContent from the form submission
   var noteId = req.body.noteId;
   var noteContent = req.body.noteContent;
   
   // Loop through all notes to find the one matching the noteId
   notes.forEach(note => {
       if (note.noteId == noteId) {
           // Update the content of the matching note
           note.noteContent = noteContent;
       }
   });
   
   // Re-render the home page with the updated notes array
   res.render("home", {
       data: notes
   });
});

// ====================================
// 9. ROUTE 4: POST "/delete" - Delete a Note
// ====================================
// HTTP POST request to /delete endpoint
// Purpose: Remove a note from the notes array
app.post('/delete', (req, res) => {
   // Get the noteId to delete from the form submission
   var noteId = req.body.noteId;
   
   // Initialize a counter to track the index position
   var j = 0;
   
   // Loop through all notes
   notes.forEach(note => {
       j = j + 1;  // Increment counter for each note
       
       if (note.noteId == noteId) {
           // When we find the matching note, remove it from the array
           // splice(index, quantity) removes 'quantity' elements starting from 'index'
           // (j - 1) because array indices start at 0, but our counter starts at 1
           notes.splice((j - 1), 1);
       }
   });
   
   // Re-render the home page with the updated notes array
   res.render("home", {
       data: notes
   });
});

// ====================================
// 10. START SERVER - LISTEN ON PORT
// ====================================
// Start the Express server and listen for incoming requests on port 3000
// req, res are callback parameters (not typically used in listen, but included here)
app.listen(3000, (req, res) => {
   console.log("App is running on port 3000");
   console.log("Open your browser and go to: http://localhost:3000");
});

// ====================================
// APPLICATION FLOW SUMMARY
// ====================================
// 1. User opens http://localhost:3000 in browser
// 2. GET "/" route displays all notes using home.ejs template
// 3. User can:
//    a) Add a new note using the "Add Note" form
//    b) Update existing notes using the "Update" form for each note
//    c) Delete notes using the delete button (X) for each note
// 4. Each action triggers a POST request which updates the notes array
// 5. The page is re-rendered with the updated notes
