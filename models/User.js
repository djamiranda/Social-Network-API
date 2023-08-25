// Import required modules from mongoose
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Import the Thought model and thoughtSchema
const { Thought, thoughtSchema } = require('./Thought');

// Create a schema for users
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true, // Username should be unique
            required: true,
            trim: true, // Trim whitespace from input
        },
        email: {
            type: String,
            unique: true, // Email should be unique
            required: true,
            match: /^\S+@\S+\.\S+$/, // Validate email format
        },
        friends: [this], // An array of User objects (self-referencing)

    },
    {
        toJSON: {
            virtuals: true, // Include virtuals when converting to JSON
            getters: true, // Include getters when converting to JSON
        },
        id: false, // Exclude id field from the document
    }
);

// Define a virtual property 'friendCount' for userSchema
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Define a virtual property 'thoughts' for userSchema
userSchema.virtual('thoughts', {
    ref: 'Thought', // Reference the Thought model
    localField: 'username', // Field in this schema
    foreignField: 'username', // Field in the referenced Thought schema
});

// Create a User model based on the userSchema
const User = model('User', userSchema);

// Export the User model
module.exports = User;
