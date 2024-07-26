import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  imageUrl: String,
  desc: String,
  likes: [],
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

export default Post;
