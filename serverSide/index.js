import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import AuthUser from './routes/AuthUser.js';
import UserRoute from './routes/UserRoute.js';
import PostRoute from './routes/PostRoute.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use('/uploads', express.static('uploads'));

// Configure Multer
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Routes
app.use('/auth', AuthUser);
app.use('/users', UserRoute);
app.use('/posts', PostRoute);

// Root route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Social Media Platform API');
});

// Endpoint for creating a post
app.post('/posts', upload.single('image'), async (req, res) => {
  try {
    const { userId, desc } = req.body;
    const imageUrl = req.file ? `uploads/${req.file.filename}` : null;
    const newPost = new Post({ userId, desc, imageUrl });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(error.message));
