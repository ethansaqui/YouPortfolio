const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    description: String,
    content: String,
    author: String,
    likes: Number
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;