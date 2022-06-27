const db = require(`../database/models/db`);


const controller = {
    getHomepage : function(req, res) {
        res.render('index');
    }
}

module.exports = controller;