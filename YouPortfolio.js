const express = require('express');
const hbs = require(`hbs`);
const bodyParser = require(`body-parser`);
const routes = require(`./routes/routes.js`);
const db = require(`./database/models/db`);
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');

const app = new express();
db.connect();
app.use(flash());
app.use(session({
    secret: 'somegibberishsecret',
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/youPortfolioDB'
    }),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
}));
// Global messages vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

app.set(`view engine`, `hbs`);
hbs.registerPartials(__dirname + `/views/partials`);



const fileUpload = require('express-fileupload');
app.use(express.static('public'));









var server = app.listen(3000, function() {
    console.log("node server runing port 3000. . . . .");
});