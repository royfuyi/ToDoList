const express = require("express"); // Import Express
const cors = require("cors"); // Import CORS middleware

const app = express(); // Initialize the Express app
const port = 3000; // Define the port where the server will listen

// Use CORS to allow requests from the frontend
app.use(cors());

// Use express.json() to parse incoming JSON requests
app.use(express.json());

// In-memory array to store tasks
let tasks = [
    { id: 1, task: "Buy groceries" }, 
    { id: 2, task: "Finish homework" },
    { id: 3, task: "Call the doctor" }];


// GET route to send the list of tasks to the frontend
app.get("/tasks", (request, response) => {
    response.json(tasks); // Send the tasks array as a JSON response
});

// Start the server and listen for requests on port 3000
app.listen(port, () => {
    console.log(`Server is running!`);
});
