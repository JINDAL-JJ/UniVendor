const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')

passport.use( new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done) {
        User.findOne({email: email}, function(err, user) {
            if (err) {console.log('Unable to find user in database'); return done(err);}

            if (!user) {
                console.log('invalid username/password');
                return done(null, false);
            }

            if (user.password != password) {
                console.log('invalid password');
                return done(null, false);
            }

            return done(null, user);
        })
    }
))

// serializing: passing data from database to cookie
passport.serializeUser(function(user, done) {
    done(null, user.id);
})

//deserializing: passing data from cookie to database
passport.deserializeUser(function(user, done) {
    User.findById(user.id, function(err, user) {
        if (err) {console.log('error while deserializing'); return done(err);}
    })
    return done(null, user);
})

//verify the user if logged in or not
// passport.checkAuthentication(function(req, res, next) {
//     if (req.isAuthenticated) {
//         return next;
//     }

//     return res.redirect('/users/sign-in');
// })
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next) {
    // console.log(req);
    if (req.isAuthenticated()) {
        // console.log(req.user)
        res.locals.user = req.user;
        // console.log(res.locals)
    }
    next();
}

module.exports = passport;