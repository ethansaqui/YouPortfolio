const express = require('express');
const hbs = require(`hbs`);
const bodyParser = require(`body-parser`);
const routes = require(`./routes/routes.js`);
const db = require(`./database/models/db`);

const app = new express();
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes);

app.set(`view engine`,`hbs`);
hbs.registerPartials(__dirname + `/views/partials`);



const fileUpload = require('express-fileupload');
app.use(express.static('public'));







var server = app.listen(3000,function(){
    console.log ("node server runing port 3000. . . . .");
});