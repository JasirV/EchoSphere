const Router = require('./Routes/otpRoutes');
const express = require('express');
const multer  = require('multer');
const userRouter = require('./Routes/userRoutes');
const postRouter = require('./Routes/postRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configure Multer to handle form data
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Use original filename
  }
});
const upload = multer({ storage: storage });

// Routes
app.use('/', userRouter);
app.use("/user",Router);
app.use('/post', upload.single('file'), postRouter); // Handle POST requests with form data

module.exports = app;
