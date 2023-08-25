const { Thought, User } = require('../models');

module.exports = {
    // GET all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    
    // GET a single thought by its ID
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thought 💭 with that ID 🆔' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    
    // POST a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No User 👤 found with that ID 🆔' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    
    // PUT update a thought by its ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thought 💭 with that ID 🆔' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    
    // DELETE a thought by its ID
    removeThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thought 💭 with that ID 🆔' })
                    : res.json({ message: 'Thought 💭 deleted 🗑️!' })
            )
            .catch((err) => res.status(500).json(err));
    },
    
    // POST create a reaction for a thought
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thought 💭 with that ID 🆔' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    
    // DELETE a reaction for a thought by its reactionId
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thought 💭 with that ID 🆔' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};
