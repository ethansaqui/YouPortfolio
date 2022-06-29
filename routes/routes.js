const express = require(`express`);
const controller = require(`../controllers/controller.js`);
const { registerValidation } = require('../validators');
const { loginValidation } = require('../validators');
const app = express();

app.post('/register', registerValidation, controller.registerUser);
app.post('/login', loginValidation, controller.loginUser);
app.get(`/`, controller.getRegister);
app.get(`/account`, controller.getAccountPage);
app.get(`/home`, controller.getHomepage);
app.get('/register', controller.getRegister);
app.get('/login', controller.getLogin);
app.get('/logout', controller.logoutUser);

//app.get('/logout', isPrivate, controller.logoutUser);


module.exports = app;