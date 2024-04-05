const Router = require('./Routes/otpRoutes');
const express = require('express');
const multer  = require('multer');
const userRouter = require('./Routes/userRoutes');
const postRouter = require('./Routes/postRoutes');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
// Routes
app.use('/', userRouter);
app.use("/user",Router);
app.use('/post',postRouter); 
module.exports = app;
