const express = require(`express`);
const controller = require(`../controllers/controller.js`);
const { registerValidation } = require('../public/scripts/validators');
const { loginValidation } = require('../public/scripts/validators');
const app = express();

// middleware for upload
var multer = require('multer');
var storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'public/postImages');
    }, filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var Profilestorage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'public/images');
    }, filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({storage : storage});
var ProfileUpload = multer({storage: Profilestorage});
app.post('/register', registerValidation, controller.registerUser);
app.post('/login', loginValidation, controller.loginUser);
app.post('/uploadpost', upload.single('imageIn') , controller.uploadPost);
app.post('/ChangePhoto', ProfileUpload.single('ImageIn'), controller.changePhoto);
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