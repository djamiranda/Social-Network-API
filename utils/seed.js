// Import the required modules and data
const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usersData, thoughtsData } = require('./data');

// Once the database connection is open, execute the following code
connection.once('open', async () => {
    console.log('connected');

    // Delete all existing documents from the User collection
    await User.deleteMany({});

    // Delete all existing documents from the Thought collection
    await Thought.deleteMany({});

    // Insert the sample user data into the User collection
    await User.insertMany(usersData);

    // Insert the sample thought data into the Thought collection
    await Thought.insertMany(thoughtsData);

    // Log a message indicating successful data seeding and exit the process
    console.info('Data seeded!');
    process.exit(0);
});
