const bcrypt = require('bcryptjs'); // or require('bcrypt')

// Plaintext password for testing
const plaintextPassword = '12345678';

// Hashed password from your database
const storedHashedPassword = '$2a$10$N8Ic75mdW0hLHsKU2g4eu.X3qBFieSdLO.6SiQze5wAVKphH5YwfO';

// Function to hash the plaintext password
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        console.log('Hashed Password:', hashed);
        return hashed;
    } catch (error) {
        console.error('Error hashing password:', error);
    }
};

// Function to compare plaintext password with hashed password
const comparePassword = async (plaintext, hash) => {
    try {
        const isMatch = await bcrypt.compare(plaintext, hash);
        console.log('Password comparison result:', isMatch);
        return isMatch;
    } catch (error) {
        console.error('Error comparing password:', error);
    }
};

// Main function to run the checks
const runChecks = async () => {
    console.log('Plaintext Password:', plaintextPassword);

    // Hash the plaintext password
    const hashedPassword = await hashPassword(plaintextPassword);

    // Compare the plaintext password with the newly hashed password
    console.log('Comparing with newly hashed password...');
    const newHashMatch = await comparePassword(plaintextPassword, hashedPassword);
    console.log('New hash comparison result:', newHashMatch);

    // Compare the plaintext password with the stored hashed password
    console.log('Comparing with stored hashed password...');
    const storedHashMatch = await comparePassword(plaintextPassword, storedHashedPassword);
    console.log('Stored hash comparison result:', storedHashMatch);
};

runChecks();