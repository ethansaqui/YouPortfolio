const express = require('express');
const hbs = require(`hbs`);
const bodyParser = require(`body-parser`);
const app = new express();
const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/youPortfolioDB',
{useNewURLParser: true, useUnifiedTopology: true}); //create database connection

app.use(bodyParser.urlencoded({extended: false}));

app.set(`view engine`,`hbs`);
hbs.registerPartials(__dirname + `/views/partials`);

const fileUpload = require('express-fileupload');
app.use(express.static('public'));

app.get('/',function(req,res){
    //res.sendFile(__dirname + '\\' + 'login.html');
    res.render("index")
});

app.get('/homepage',function(req,res){
    res.sendFile(__dirname + '\\' + 'homepage.html');
});

app.get('/register',function(req,res){
    res.sendFile(__dirname + '\\' + 'Register.html');
});

app.get('/account',function(req,res){
    res.sendFile(__dirname + '\\' + 'accountpage.html');
});

var server = app.listen(3000,function(){
    console.log ("node server runing port 3000. . . . .");
});