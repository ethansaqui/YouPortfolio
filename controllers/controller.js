const db = require(`../database/models/db`);

const Profile = require('../models/Profile.js');

const controller = {
    getHomepage : function(req, res) {
        res.render('index');
    },

    getAccountPage: function(req, res){
        res.render ('/layouts/accountpage.hbs');
    }
}

module.exports = controller;