import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

import AuthUser from './routes/AuthUser.js';
import UserRoute from './routes/UserRoute.js';
import PostRoute from './routes/PostRoute.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

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

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`));
  })
  .catch((error) => console.log(error.message));

// User model
 // Assuming you have a User model in models/User.js

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('watchFollowers', (userId) => {
    console.log(`Watching followers for user: ${userId}`);
    // Initial fetch and emit of followers count
    User.findById(userId, (err, user) => {
      if (err) return console.error(err);
      socket.emit('updateFollowers', user.followers.length);
    });

    // MongoDB change stream to watch changes in the User collection
    const changeStream = User.watch();
    changeStream.on('change', (change) => {
      if (change.operationType === 'update' && change.documentKey._id.toString() === userId) {
        User.findById(userId, (err, user) => {
          if (err) return console.error(err);
          socket.emit('updateFollowers', user.followers.length);
        });
      }
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
      changeStream.close();
    });
  });
});
const posts = [
  {
    id: '668b1cedaded4275317623c6',
    userId: '668aaf45f94d3ac5e0b7192d',
    desc: 'I am Umesha here',
    likes: [],
    createdAt: '2024-07-07T22:55:41.423+00:00',
    updatedAt: '2024-07-07T23:01:08.396+00:00',
  },
  // Add more post objects as needed
];

app.get('/auth/posts/:userId/timeline', (req, res) => {
  const userId = req.params.userId;
  const userPosts = posts.filter(post => post.userId === userId);
  res.json(userPosts);
});

app.post('/auth/posts', (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.json(newPost);
});