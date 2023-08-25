const { User, Thought } = require('../models');

module.exports = {
    // GET all users
    getUsers(req, res) {
        User.find()
            .populate('thoughts')
            .populate('friends')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // GET a single user by their ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'No User 👤 with that ID 🆔' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // POST create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // PUT update a user by their ID
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No User 👤 found with that ID 🆔' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // DELETE a user by their ID
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((response) =>
                !response
                    ? res.status(404).json({ message: 'User 👤 doesnt exist' })
                    : Thought.deleteMany({
                          username: response.username,
                      }).then((thoughts) =>
                          !thoughts
                              ? res.status(404).json({
                                    message: 'User 👤 deleted 🗑️, no Thoughts 💭 found',
                                })
                              : res.json({ message: 'User 👤 & Thoughts 💭 deleted 🗑️' })
                      )
            )
            .catch((err) => res.status(500).json(err));
    },

    // POST add a friend to a user's friends list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No User 👤 found with that ID 🆔' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // DELETE remove a friend from a user's friends list
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No User 👤 found with that ID 🆔' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};
