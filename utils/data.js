const thoughtsData = [
    {
        thoughtText: 'I love 🌭!',
        username: 'Mickey_Mouse',
        createdAt: '2023-08-19T15:00:00Z',
        reactions: [
            {
                reactionBody: 'What kind?',
                username: 'Minnie_Mouse',
                createdAt: '2023-08-19T16:00:00Z',
            },
            {
                reactionBody: 'What toppings?',
                username: 'Donald_Duck',
                createdAt: '2023-08-19T17:00:00Z',
            },
        ],
    },
    {
        thoughtText: 'Daisy is my BFF!',
        username: 'Minnie_Mouse',
        createdAt: '2023-08-20T10:00:00Z',
        reactions: [
            {
                reactionBody: 'I thought I was!',
                username: 'Mickey_Mouse',
                createdAt: '2023-08-20T11:00:00Z',
            },
        ],
    },
    {
        thoughtText: "All you need is a little bit of magic!",
        username: 'Mickey_Mouse',
        reactions: [
            {
                reactionBody: '👍',
                username: 'Minnie_Mouse',
            },
            {
                reactionBody: '❤️',
                username: 'Donald_Duck',
            },
        ],
    },
    {
        thoughtText: 'Whenever I see you, you have a big smile on your face. Its quite contagious!',
        username: 'Minnie_Mouse',
        reactions: [
            {
                reactionBody: '❤️',
                username: 'Mickey_Mouse',
            },
        ],
    },
    {
        thoughtText: 'Aw, phooey!',
        username: 'Donald_Duck',
        reactions: [
            {
                reactionBody: '🤣',
                username: 'Minnie_Mouse',
            },
        ],
    },
];

const usersData = [
    {
        username: 'Mickey_Mouse',
        email: 'Mickey.Mouse@disney.com',
        friends: [],
        reactions: [],
    },
    {
        username: 'Minnie_Mouse',
        email: 'Minnie.Mouse@disney.com',
        friends: [],
        reactions: [],
    },
    {
        username: 'Donald_Duck',
        email: 'Donald.Duck@disney.com',
        friends: [],
        reactions: [],
    },
];
module.exports = { usersData, thoughtsData };
