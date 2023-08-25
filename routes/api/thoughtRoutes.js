// Import the necessary modules for routing
const router = require('express').Router();

// Import the thoughtController functions for handling different routes
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    removeThought,
    createReaction,
    removeReaction,
} = require('../../controllers/thoughtController.js');

// Define the routes and their corresponding HTTP methods
// For the '/thoughts' endpoint
router.route('/').get(getThoughts).post(createThought);

// For the '/thoughts/:thoughtId' endpoint
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(removeThought);

// For the '/thoughts/:thoughtId/reactions' endpoint
router.route('/:thoughtId/reactions').post(createReaction);

// For the '/thoughts/:thoughtId/reactions/:reactionId' endpoint
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// Export the configured router to be used in the application
module.exports = router;
