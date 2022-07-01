const express = require('express');
const hbs = require(`hbs`);
const bodyParser = require(`body-parser`);
const routes = require(`./routes/routes.js`);
const db = require(`./database/models/db`);
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');



//upload code
require('dotenv/config');

const app = express();
db.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true }, err => {
        console.log('connection')
    }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set(`view engine`, `hbs`);
hbs.registerPartials(__dirname + `/views/partials`);

// for hbs helpers
hbs.registerHelper('convertImage', (image) => {
    var imageString = image.data.toString('base64');
    var imagePath = "data:" + image.contentType + ";base64," + imageString;
    return imagePath;
})

hbs.registerHelper('is_eq', function(x, y, options) {
    if(typeof x == 'undefined' || typeof y == 'undefined') {
        console.log("ignored undefined in is_eq")
        return false;
    }
    if(x == null || y == null) {
        return false
    } 
    if(x.equals(y)) // Or === depending on your needs
        return true;
});

hbs.registerHelper('strcmp', function(x,y) {
    return x == y;
})

hbs.registerHelper('combineComments', function(x, y) {
    return {comment: x, comments: y}
})

hbs.registerHelper('combinePostImage', function(x, y) {
    return {user: x, postUser: y}
})

// end of upload code


app.use(flash());
app.use(session({
    secret: 'somegibberishsecret',
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/youPortfolioDB'
    }),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 },

}));
// Global messages vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use('/', routes);

app.use(express.static('public'));

var server = app.listen(3000, function() {
    console.log("node server runing port 3000. . . . .");
});