const db = require(`../database/models/db`);

const profile = require(`../database/models/Profile`);
const Post = require(`../database/models/Post`);
const Comment = require(`../database/models/Comment`);

const { validationResult } = require('express-validator');
const { isPrivate } = require('../middlewares/checkAuth');

const bcrypt = require('bcrypt');
var fs = require('fs');
var path = require('path');
const M = require('minimatch');
const saltRound = 10;

const controller = {
    getRegister: function(req, res) {
        if (req.session.user) {
            res.redirect('/home')
        } else {
            res.render('register', {
                pageTitle: 'Registration',
            });
        }
    },
    getLogin: function(req, res) {
        if (req.session.user) {
            res.redirect('/home')
        } else {

            res.render('login', {
                pageTitle: 'Login',
            })
        }
    },
    getHomepage: function(req, res) {
        if(req.session.user) {
            db.findMany(Post, {}, "", (posts) => {
                res.render('index', {posts : posts}, () => {
                    db.findMany(Comment, {}, "", (comments) => {
                        res.render('index', 
                        {
                            posts : {
                            main : posts, 
                            comments : comments}
                        })
                    })
                });  
            })
        }
        else {
            res.redirect("/login");
        }
        

        // load comments

    },
    getAccountPage: function(req, res) {
        var username = req.session.name;
        var projection = "username CoverPhoto ProfileImage Bio";
        var Projects
        db.findMany(Post, {artist:username}, 'img', function(result){
            Projects = result;
            db.findOne(profile, {username: username}, projection, function(result){
                var data = {
                    username: result.username,
                    CoverPhoto: result.CoverPhoto,
                    ProfileImage: result.ProfileImage,
                    Bio: result.Bio,
                    userworks: Projects
                }
                res.render('accountpage', data);
            });
        });
    },
    registerUser: function(req, res) {
        const errors = validationResult(req);
        var projection = "";
        var data = fs.readFileSync(path.join(__dirname + `/../public/images/guest.png`))
        var coverdata = fs.readFileSync(path.join(__dirname + `/../public/images/default-cover.png`))
        if (errors.isEmpty()) {
            const username = req.body.username;
            var password = req.body.password;
            console.log(username);
            console.log(password);
            db.findOne(profile, { username: username }, projection, async(result) => {
                console.log(result);
                if (result != null) {


                    req.flash('error_msg', 'User already exists. Please login.');
                    res.redirect('/login');
                    console.log("HERE1")
                } else {
                    var newUser;
                    console.log("HERE2")
                    password = await bcrypt.hash(password, saltRound);
                    newUser = { username: username, password: password, CoverPhoto:{
                        data: coverdata,
                        contentType: 'image/png'
                    }, ProfileImage: {
                        data: data,
                        contentType: 'image/png'
                    }, Bio: "Current Status" }
                    console.log(newUser);
                    db.insertOne(profile, newUser, (err) => {
                        console.log(err);
                        if (!err) {
                            console.log("HERE4")
                            req.flash('error_msg', 'Could not create user. Please try again.');
                            res.redirect('/register');
                            // res.status(500).send({ message: "Could not create user"});
                        } else {
                            console.log("HERE5")
                            req.flash('success_msg', 'You are now registered! Login below.');
                            res.redirect('/login');
                        }
                    });

                }
            });
        } else {
            const messages = errors.array().map((item) => item.msg);
            console.log("sicK");
            req.flash('error_msg', messages.join(' '));
            res.redirect('/register');
        }

    },
    loginUser: function(req, res) {
        const errors = validationResult(req);
        var projection = "";
        console.log("HERE1")
        if (errors.isEmpty()) {

            const username = req.body.username;
            var password = req.body.password;

            console.log("HERE2")
                // Next items go here... Same as before, this will be replaced.
            db.findOne(profile, { username: username }, projection, async(user) => {

                // Successful query
                if (user != null) {
                    // User found!
                    bcrypt.compare(password, user.password, (err, result) => {
                            // passwords match (result == true)
                            if (result) {
                                // Update session object once matched!
                                req.session.user = user._id;
                                req.session.name = user.username;

                                console.log(req.session);

                                res.redirect('/home');
                            } else {
                                // passwords don't match
                                req.flash('error_msg', 'Incorrect password. Please try again.');
                                res.redirect('/login');
                            }
                        })
                        // next block of code goes here

                } else {
                    // No user found
                    req.flash('error_msg', 'No registered user with that username. Please register.');
                    res.redirect('/register');
                }

            });
        } else {
            const messages = errors.array().map((item) => item.msg);

            req.flash('error_msg', messages.join(' '));
            res.redirect('/login');
        }
    },
    uploadPost: function(req, res, next) {
        var data = fs.readFileSync(path.join(__dirname + `/../public/postImages/` + req.file.filename))
        var tempPost = {
            caption: req.body.captionIn,
            img: {
                data: data,
                contentType: 'image/png'  
            },
            artist: req.session.name,
            likes: 0,
            artistPicture: "no-pic"
        }
        
        db.insertOne(Post, tempPost, (err) => {
            res.redirect('/home');
        })
    },
    uploadComment: function(req, res) {
        var tempComment = {
            postId: req.body.postID,
            parentCommentId: null,
            username: req.session.name,
            content: req.body.comment
        }
        db.insertOne(Comment, tempComment, (err) => {
            res.redirect('/home');
        })
    },
    uploadReply: function(req, res) {
        var tempComment = {
            postId: req.body.postID,
            parentCommentId: req.body.parentCommentId,
            username: req.session.name,
            content: req.body.reply
        }
        db.insertOne(Comment, tempComment, (err) => {
            res.redirect('/home');
        })
    },
    changePhoto: function(req,res,next){
        var data = fs.readFileSync(path.join(__dirname + `/../public/images/` + req.file.filename))
        console.log(req.file.filename);
        var username = req.session.name
        var ProfileImage = {
            data: data,
            contentType: 'image/png'
        }
        db.updateOne(profile, {username: username}, {ProfileImage: ProfileImage},function(){
            console.log("Update Done");
            res.redirect('/account');
        })
        
    },
    changeCover: function(req,res,next){
        var data = fs.readFileSync(path.join(__dirname + `/../public/images/` + req.file.filename))
        console.log(req.file.filename);
        var username = req.session.name
        var CoverPhoto = {
            data: data,
            contentType: 'image/png'
        }
        db.updateOne(profile, {username: username}, {CoverPhoto: CoverPhoto},function(){
            console.log("Update Done");
            res.redirect('/account');
        })
        
    },
    changeBio: function(req,res) {
        var Bio = req.query.Bio;
        var username = req.session.name;
        db.updateOne(profile, {username: username}, {Bio: Bio}, function(){
            res.redirect('/account');
        })
    },

    logoutUser: function(req, res) {
        if (req.session) {
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
                res.redirect('/login');
            });
        } else {
            res.render('login');
        }
    }

}

module.exports = controller;