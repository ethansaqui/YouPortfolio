const db = require(`../database/models/db`);

const profile = require(`../database/models/Profile`);
const Post = require(`../database/models/Post`);
const Comment = require(`../database/models/Comment`);

const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
var fs = require('fs');
var path = require('path');
const saltRound = 10;

const controller = {
    getRegister: function(req, res) {
        res.render('register');
    },
    getHomepage: function(req, res) {
        //upload test code, remove later
        Post.find({}, (err, posts) => {
            if(err) {
                console.log(err);
                res.status(500).send('Something broke in Post find');
            }
            else {
                res.render('index', {posts : posts});
            }
        })
    },
    getAccountPage: function(req, res) {
        res.render('/layouts/accountpage.hbs');
    },
    registerUser: function(req, res) {
        const errors = validationResult(req);
        var projection = "";
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
                    newUser = { username: username, password: password, CoverPhoto: null, ProfileImage: null, Bio: null }
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
            artist: "filler-artist",
            likes: 0,
            artistPicture: "no-pic"
        }
        
        Post.create(tempPost, (err, item) => {
            if(err) {
                console.log(err);
            }
            else {
                res.redirect('/home');
            }
        })
    },

    changePhoto: function(req,res,next){
        var data = fs.readFileSync(path.join(__dirname + `/../public/images/` + req.file.filename))
        console.log(data);
        res.redirect('/account');
    }
}

module.exports = controller;