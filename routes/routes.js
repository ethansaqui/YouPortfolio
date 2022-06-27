const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

app.get(`/`, controller.getHomepage);
app.get(`/account`, controller.getAccountPage);

module.exports = app;