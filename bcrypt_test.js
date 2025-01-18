const bcrypt = require('bcrypt');

// Plaintext password for testing
const plaintextPassword = 'your_plaintext_password';

// Hashed password from your database
const hashedPassword = '$2a$10$AMhDhhpFw5Y8WmBnswreIOJZT/lrEzMEhfE/i5.ven/68VO82ToIe';

// Function to hash a plaintext password
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        console.log('Hashed Password:', hashed);
    } catch (error) {
        console.error('Error hashing password:', error);
    }
};

// Function to compare plaintext password with hashed password
const comparePassword = async (plaintext, hash) => {
    try {
        const isMatch = await bcrypt.compare(plaintext, hash);
        console.log('Password comparison result:', isMatch);
    } catch (error) {
        console.error('Error comparing password:', error);
    }
};

// Hash the plaintext password
hashPassword(plaintextPassword);

// Compare the plaintext password with the stored hashed password
comparePassword(plaintextPassword, hashedPassword);