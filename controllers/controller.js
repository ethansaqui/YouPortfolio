const db = require(`../database/models/db`);

const Profile = require(`../database/models/Profile`);

const controller = {
    getHomepage : function(req, res) {
        res.render('index');
    },

    getAccountPage: function(req, res){
        res.render ('accountpage');
    }
}

module.exports = controller;