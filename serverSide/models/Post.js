// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  desc: { type: String },
  img: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
