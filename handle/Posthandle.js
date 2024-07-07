import Post from '../models/Post.js';
import mongoose from 'mongoose';

 


//create a post

export const createPost = async (req, res) => {

    const newPost = new Post(req.body);

    try {
        await newPost.save();
        res.status(200).json("Post has been created successfully!");
    } catch (error) {
        res.status(500).json(error);
    }
}


