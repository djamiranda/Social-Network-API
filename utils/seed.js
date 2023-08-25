const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usersData, thoughtsData } = require('./data');

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    await Thought.deleteMany({});

    await User.insertMany(usersData);
    await Thought.insertMany(thoughtsData);

    console.info('Data seeded!');
    process.exit(0);
});
