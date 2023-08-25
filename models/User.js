const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const { Thought, thoughtSchema } = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: /^\S+@\S+\.\S+$/,
        },

        friends: [this],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });
userSchema.virtual('thoughts', {
    ref: 'Thought',
    localField: ['username'],
    foreignField: ['username'],
});

const User = model('User', userSchema);

module.exports = User;
