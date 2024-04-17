const Router = require('./Routes/otpRoutes');
const express = require('express');
const multer  = require('multer');
const userRouter = require('./Routes/userRoutes');
const postRouter = require('./Routes/postRoutes');
const cors = require('cors');
const ChatRoute = require('./Routes/ChatRoute');
const app = express();
app.use(cors());
app.use(express.json());
// Routes
app.use('/', userRouter);
app.use("/user",Router);
app.use('/post',postRouter); 
app.use('/chat',ChatRoute)
module.exports = app;
