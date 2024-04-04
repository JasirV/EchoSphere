const express = require('express');
const path = require('path');
const verifyEmail = require('../Controller/otpController');
// const { resetPassword } = require('../Controller/userController');
// const { resetPasswordLink } = require('../Utils/sendEmail');

const Router = express.Router();

Router.get("/verify/:token", verifyEmail);
// Router.post("/request-passwordreset", requestPasswordReset);
// Router.get("/reset-password/:userId/:token", resetPassword);
// Router.post("/reset-password", changePassword);
Router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, '../views/verifiedpage.html'));
});

module.exports = Router;
