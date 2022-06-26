const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.ObjectId,
        ref: 'Post',
        required: true,
    },

    parentCommentId: {
        type: mongoose.ObjectId,
        ref: 'Comment',
        required: false,
    },

    username: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;