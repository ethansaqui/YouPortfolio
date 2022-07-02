const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    postId: mongoose.ObjectId,
    parentCommentId: {
        type: mongoose.ObjectId,
        required: false,
    },
    username: String,
    content: String,
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;