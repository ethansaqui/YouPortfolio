const express = require('express');
const hbs = require(`hbs`);
const bodyParser = require(`body-parser`);
const routes = require(`./routes/routes`);
const db = require(`./database/models/db`);

db.connect()

const app = express();
app.use(bodyParser.urlencoded({extended: false}));


app.set(`view engine`,`hbs`);
hbs.registerPartials(__dirname + `/views/partials`);

const fileUpload = require('express-fileupload');
const path = require('path');

app.use(fileUpload());

app.use(express.static(`public`));
app.use(`/`, routes);

app.get('/', (req, res) => {
    res.render('index');
})

var server = app.listen(3000,function(){
    console.log ("node server runing port 3000. . . . .");
});