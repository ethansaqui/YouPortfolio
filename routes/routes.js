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
app.post('/upload', upload.single('imageIn') , controller.uploadPost);
app.post('/editcomment', controller.editComment);
app.post('/deletecomment', controller.deleteComment);
app.post('/ChangePhoto', ProfileUpload.single('ProfileImage'), controller.changePhoto);
app.post('/ChangeCover', ProfileUpload.single('CoverPhoto'), controller.changeCover);
app.post('/updatelikes', controller.updateLikes);
app.post('/followuser', controller.followUser);
app.get('/ChangeBio', controller.changeBio);
app.get('/ChangeCaption', controller.changeCaption);
app.get('/DeletePost', controller.DeletePost);
app.post('/uploadcomment', controller.uploadComment);
app.post('/uploadreply', controller.uploadReply);
app.get(`/`, controller.getRegister);
app.get(`/account`, controller.getAccountPage);
app.get('/VisitAccount/:id',controller.visitAccount);
app.get(`/home`, controller.getHomepage);
app.get('/register', controller.getRegister);
app.get('/login', controller.getLogin);
app.get('/logout', controller.logoutUser);
app.get('/about', controller.getAbout);

//app.get('/logout', isPrivate, controller.logoutUser);


module.exports = app;