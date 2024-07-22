import Post from '../models/Post.js';
import mongoose from 'mongoose';
import User from '../user/user.js';

export const createPost = async (req, res) => {
    const { userId, desc } = req.body;
    let imageUrl = '';

    if (req.file) {
        imageUrl = `uploads/${req.file.filename}`;
    }

    const newPost = new Post({
        userId,
        desc,
        imageUrl,
    });

    try {
        await newPost.save();
        res.status(200).json("Post has been created");
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getPost = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;

    try {
        const post = await Post.findById(postId);
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post Updated");
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await Post.findById(id);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted successfully");
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await Post.findById(id);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json("Post liked");
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json("Post Unliked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id;

    try {
        const currentUserPosts = await Post.find({ userId: userId });
        const followingPosts = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts",
                },
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0,
                },
            },
        ]);

        res.status(200).json(
            currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a, b) => {
                return b.createdAt - a.createdAt;
            })
        );
    } catch (error) {
        res.status(500).json(error);
    }
};
