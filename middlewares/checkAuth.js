exports.isPrivate = (req, res, next) => {
    // Must be authenticated to go to the next function
    console.log(req.session);
    /*if (typeof req.session.user !== 'undefined') {
        return next()
    } else {
        res.redirect('/login');
    }*/
};

exports.isPublic = (req, res, next) => {
    // If authenticated, go to home page
    /*if (typeof req.session.user !== 'undefined') {
        res.redirect('/home');
    } else {
        return next();
    }*/
};