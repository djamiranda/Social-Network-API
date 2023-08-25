// Import the necessary modules for routing
const router = require('express').Router();

// Import the userController functions for handling different routes
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// Define the routes and their corresponding HTTP methods
// For the '/users' endpoint
router.route('/').get(getUsers).post(createUser);

// For the '/users/:userId' endpoint
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// For the '/users/:userId/friends/:friendId' endpoint
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// Export router
module.exports = router;
