// Import the necessary modules for routing
const router = require('express').Router();

// Import the routes for thoughts and users
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// Use the thoughtRoutes for '/thoughts' endpoint
router.use('/thoughts', thoughtRoutes);

// Use the userRoutes for '/users' endpoint
router.use('/users', userRoutes);

// Export the router to be used in the application
module.exports = router;
