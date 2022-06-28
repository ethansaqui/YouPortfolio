const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    caption: String,
    img: {
        data: Buffer,
        contentType: String
    },
    artist: String,
    likes: Number,
    artistPicture: String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;