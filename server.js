// Import required modules and set up the server
const express = require('express');
const db = require('./config/connection'); // Import the database connection
const routes = require('./routes'); // Import the routes

const PORT = process.env.PORT || 3001; // Set the port for the server
const app = express(); // Create an Express application

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the defined routes for handling requests
app.use(routes);

// Open the database connection and start the server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT} 🚀!`);
    });
});
