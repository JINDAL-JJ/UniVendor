const express = require('express');
const cookieParser = require('cookie-parser');
const app = express()
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local')
//mongo store is being used to store session cookie in database
const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setting ejs view engine 
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'session-id',
    secret: 'hidden',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    // store: new MongoStore({
    //     mongooseConnection: db,
    //     autoRemove: 'disabled'
    // }, function(err) {
    //     console.log(err || 'connect-mongodb setup ok');
    // })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// directing to router
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        console.log('Error connecting to server', err);
        return;
    }

    console.log(`Successfully connected to port: ${port}`)
});