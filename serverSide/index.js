import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

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

// Routes
app.use('/auth', AuthUser);
app.use('/users', UserRoute);
app.use('/posts', PostRoute);

// Root route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Social Media Platform API');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`)))
  .catch((error) => console.log(error.message));
