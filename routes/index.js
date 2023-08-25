// Import the necessary modules for routing
const router = require('express').Router();

// Import the apiRoutes module to handle API-related routes
const apiRoutes = require('./api');

// Use the '/api' prefix for all routes defined in apiRoutes module
router.use('/api', apiRoutes);

// If no valid route is matched, send a response indicating wrong route
router.use((req, res) => res.send('Wrong route!'));

// Export the configured router to be used in the application
module.exports = router;
