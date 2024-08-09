const Router = require('./Routes/otpRoutes');
const express = require('express');
const multer  = require('multer');
const userRouter = require('./Routes/userRoutes');
const postRouter = require('./Routes/postRoutes');
const cors = require('cors');
const ChatRoute = require('./Routes/ChatRoute');
const MessaageRouter = require('./Routes/MessageRoute');
const morgan =require('morgan')
const app = express();
app.use(cors());
app.use(express.json());
// Routes
app.use(morgan('dev'))
app.use('/', userRouter);
app.use("/user",Router);
app.use('/post',postRouter); 
app.use('/chat',ChatRoute)
app.use('/message',MessaageRouter)
module.exports = app;
