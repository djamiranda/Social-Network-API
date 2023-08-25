// Import required modules from mongoose
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Create a schema for reactions
const reactionSchema = new Schema(
    {
        reactionId: {
            type: mongoose.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true, // Include getters when converting to JSON
        },
        id: false, // Exclude id field from the document
    }
);

// Create a schema for thoughts
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema], // Embed reaction documents
    },
    {
        toJSON: {
            virtuals: true, // Include virtuals when converting to JSON
            getters: true, // Include getters when converting to JSON
        },
        id: false, // Exclude id field from the document
    }
);

// Define a virtual property 'reactionCount' for thoughtSchema
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Create a Thought model based on the thoughtSchema
const Thought = model('Thought', thoughtSchema);

// Export the Thought model
module.exports = Thought;
