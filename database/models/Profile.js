const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    username: String,
    password: String,
    CoverPhoto: {
        data: Buffer,
        contentType: String
    },
    ProfileImage: {
        data: Buffer,
        contentType: String
    },
    Bio: String,
    LikedPosts: [mongoose.ObjectId],
    FollowData: {
        followers: [{
            id: mongoose.ObjectId, 
            username: String
        }],
        following: [{
            id: mongoose.ObjectId, 
            username: String
        }]
    }
})

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;