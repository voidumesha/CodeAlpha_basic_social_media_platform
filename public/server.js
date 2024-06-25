const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/socialmedia', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    follows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    body: String,
    likes: Number,
    comments: [String]
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);


app.get('/api/feed', async (req, res) => {
    const posts = await Post.find().populate('user');
    res.json(posts);
});

app.post('/api/posts/:postId/like', async (req, res) => {
    const post = await Post.findById(req.params.postId);
    post.likes += 1;
    await post.save();
    res.sendStatus(200);
});

app.post('/api/posts/:postId/comment', async (req, res) => {
    const post = await Post.findById(req.params.postId);
    post.comments.push(req.body.comment);
    await post.save();
    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
