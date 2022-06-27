const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    caption: String,
    content: String,
    artist: String,
    likes: Number,
    artistPicture: String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;