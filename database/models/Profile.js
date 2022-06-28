const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    username: String,
    password: String,
    CoverPhoto: String,
    ProfileImage: String,
    Bio: String
})

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;