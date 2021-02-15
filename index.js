const express = require("express");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local");
const dotenv = require("dotenv");
//mongo store is being used to store session cookie in database
const MongoStore = require("connect-mongo")(session);

dotenv.config({ path: "./config.env" });

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// setting ejs view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "session-id",
    secret: "hidden",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    // store: new MongoStore({
    //     mongooseConnection: db,
    //     autoRemove: 'disabled'
    // }, function(err) {
    //     console.log(err || 'connect-mongodb setup ok');
    // })
  })
);

//parth code  47 - 78
// Set Storage engine
// const storage =multer.diskStorage({
//     destination : './assets/uploads/',
//     filename : function(req,file,cb){
//         cb(null,file.fieldname + '-' +Date.now() + path.extname(file.originalname));
//     }
// });

// const upload= multer({
//     storage : storage,
//     limits :{fileSize:1000000},
//     fileFilter:function(req,file,cb){
//         checkFileType(file,cb);
//     }
// }).single('myImage');

// //check file type
// function checkFileType(file, cb){
//     // Allowed ext
//     const filetypes = /jpeg|jpg|png|gif/;
//     // Check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check mime
//     const mimetype = filetypes.test(file.mimetype);

//     if(mimetype && extname){
//       return cb(null,true);
//     } else {
//       cb('Error: Images Only!');
//     }
//   }

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// directing to router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error connecting to server", err);
    return;
  }

  console.log(`Successfully connected to port: ${port}`);
});
