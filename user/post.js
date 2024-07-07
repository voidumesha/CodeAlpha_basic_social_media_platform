import mongoose from "mongoose";



const PostSchema = mongoose.Schema({

    userId: { type: String, required: true },
    desc: String,
    likes: [],
    image: String,
}, { timestamps: true });


var Post = mongoose.model("Post", PostSchema);

export default Post;