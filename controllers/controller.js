const db = require(`../database/models/db`);

const Profile = require(`../database/models/Profile`);
const Post = require(`../database/models/Post`);
const Comment = require(`../database/models/Comment`);

const controller = {
    getHomepage : function(req, res) {
        res.render('index');
    },

    getAccountPage: function(req, res) {
        
    },

    uploadPost: function(req, res) {
        console.log(req.body)
        const {image} = req.files
        image.mv(path.resolve(__dirname,'public/images',image.name),(err) => {
            Post.create({
                caption: req.caption,
                image: '/images/' + image.name,
                artist: "filler-artist",
                likes: 0,
                artistPicture: "no-image-yet"
            }, (error, post) => {
                console.log(error);
            })
        })
        
        res.send(200);
    }
}

module.exports = controller;