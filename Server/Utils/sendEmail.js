const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const { hashStrting } = require('./jwt');
const emialVerification = require('../Models/emialVerification');

dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD,
    },
});

const sendVerificationEmail = async (user, res, token) => {
    const { _id, email, lastName } = user;
    const link = `${process.env.APP_URL}/user/verify/${token}`;

    try {
        const hashToken = await hashStrting(token);
        await emialVerification.create({
            userId: _id,
            token: hashToken,
            createAt: Date.now(),
            expiresAt: Date.now() + 36000,
        });

        const info = await transporter.sendMail({
            from: '"E Book 👻" ',
            to: email,
            subject: "Hello ✔",
            text: "Hello world?",
            html: `<div style="margin: 0; padding: 0; width: 100%; font-family: Arial, sans-serif; font-size: 16px;">
                <div style="width: 100%; max-width: 600px; margin: auto; padding: 20px;">
                    <div style="background-color: #007bff; color: #fff; text-align: center; padding: 10px;">
                        <h1>Email Verification</h1>
                    </div>
                    <div style="padding: 20px; background-color: #f7f7f7;">
                        <p>Hello, ${lastName}</p>
                        <p>Please click the button below to verify your email address:</p>
                        <a href="${link}" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Verify Email</a>
                        <p>If you didn't request this, you can ignore this email.</p>
                    </div>
                </div>
            </div>`,
        });
        res.status(201).json({
            status: "success",
            message: 'Verification email has been sent to your account. Check your email for further instructions.',
        });
    } catch (error) {
        console.error('Error sending verification email:', error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const resetPasswordLink = async (user, res, token) => {
    const { _id, email, lastName } = user;
    console.log(token);
    const link = `${process.env.APP_URL}/user/reset-password/${token}`;

    try {
        const hashToken = await hashString(token);
        await emialVerification.create({
            userId: _id,
            token: hashToken,
            createAt: Date.now(),
            expiresAt: Date.now() + 36000,
        });

        const info = await transporter.sendMail({
            from: '"E Book 👻" ',
            to: email,
            subject: "Hello ✔",
            text: "Hello world?",
            html: `<div style="margin: 0; padding: 0; width: 100%; font-family: Arial, sans-serif; font-size: 16px;">
                <div style="width: 100%; max-width: 600px; margin: auto; padding: 20px;">
                    <div style="background-color: #007bff; color: #fff; text-align: center; padding: 10px;">
                        <h1>Reset Your Password</h1>
                    </div>
                    <div style="padding: 20px; background-color: #f7f7f7;">
                        <p>Hello, ${lastName}</p>
                        <p>We received a request to reset your password. If you did not make this request, you can ignore this email.</p>
                        <p>To reset your password, please click the button below:</p>
                        <a href="${link}" style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Reset Password</a>
                        <p>If you're having trouble clicking the button, you can also copy and paste the following link into your browser:</p>
                        <p>${link}</p>
                        <p>If you didn't request this password reset, no further action is needed.</p>
                    </div>
                </div>
            </div>`,
        });

        console.log('Verification email sent:', info);
        res.status(201).json({
            status: "success",
            message: 'Verification email has been sent to your account. Check your email for further instructions.',
        });
    } catch (error) {
        console.error('Error sending verification email:', error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
    sendVerificationEmail,
    resetPasswordLink
};
