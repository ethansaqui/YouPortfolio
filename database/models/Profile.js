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
    Bio: String
})

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;