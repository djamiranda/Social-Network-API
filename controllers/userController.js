const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .populate('thoughts')
            .populate('friends')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then(async (User) =>
                !User
                    ? res.status(404).json({ message: 'No User 👤 with that ID 🆔' })
                    : res.json(User)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    createUser(req, res) {
        User.create(req.body)
            .then((User) => res.json(User))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                          .status(404)
                          .json({ message: 'No User 👤 found with that ID 🆔' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
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
                                    message:
                                        'User 👤 deleted 🗑️, no Thoughts 💭 found',
                                })
                              : res.json({
                                    message:
                                        'User 👤 & Thoughts 💭 deleted 🗑️',
                                })
                      )
            )
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((User) =>
                !User
                    ? res
                          .status(404)
                          .json({ message: 'No User 👤 found with that ID 🆔' })
                    : res.json(User)
            )
            .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((User) =>
                !User
                    ? res
                          .status(404)
                          .json({ message: 'No User 👤 found with that ID 🆔' })
                    : res.json(User)
            )
            .catch((err) => res.status(500).json(err));
    },
};
