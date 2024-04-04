const User = require("../Models/Users");
const jwt = require('jsonwebtoken');

const ChekEmail = async (token,id) => {
    try {
        const decoded = jwt.verify(token, process.env.USER_ACCES_TOKEN_SECRET);
        const userId = decoded.id; 
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { verified: true }, 
            { new: true } 
        );
            return updatedUser;
    } catch (error) {
        console.error('Error verifying email:', error);
        throw new Error('Email verification failed');
    }
};

module.exports = ChekEmail;
