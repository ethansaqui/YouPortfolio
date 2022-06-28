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
app.get('/register', (req, res) => {
    res.render('register', { pageTitle: 'Registeration' });
});
app.get('/login', (req, res) => {
    res.render('login');
});


module.exports = app;