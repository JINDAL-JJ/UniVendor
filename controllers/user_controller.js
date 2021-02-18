const User = require("../models/user");
const multer = require("multer");
const path = require("path");
const post = require("../models/post");
const Product = require("../models/post");

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_in", {
    title: "Sign In",
  });
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Sign Up",
  });
};

module.exports.showProductSellForm = function (req, res) {
  if (!req.isAuthenticated()) {
    return res.render("user_sign_in", {
      title: "Sign In",
    });
  }
  return res.render("sell_product", {
    title: "Sell product",
  });
};

module.exports.createPost = function (req, res) {
  //USE: uploading the images to './assets/uploads/'
  upload(req, res, (err) => {
    // console.log(req.files);
    if (req.files.length == 0) {
      res.send("Please upload files");
      return;
    } else {
      const newProd = {
        product_name: req.body.product_name,
        product_type: req.body.product_type,
        product_price: req.body.product_price,
        product_img: req.files,
      };
      var data = new Product(newProd);
      data
        .save()
        .then((data) => {
          console.log(data);
          res.send("This item has been saved to database");
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  });
};

module.exports.create = function (req, res) {
  console.log(req.body);
  if (req.body.password != req.body.confirm_password) {
    console.log("password mismatch");
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    // console.log('going in db')
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();

  return res.redirect("/");
};

// Set Storage engine
const storage = multer.diskStorage({
  // destination : '../assets/uploads/',
  destination: function (req, file, cb) {
    cb(null, "./assets/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//Storing the array of files.......
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("product_img", 3);

// //check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// module.exports.postUpload = function (req, res) {
//   upload(req, res, (err) => {
//     // console.log(req.file)
//     var data = new post(req.file);
//     data
//       .save()
//       .then(() => {
//         // res.status(200).render('savealert.pug');
//         res.send("This item has been saved to database");
//       })
//       .catch(() => {
//         res.status(400).send("Item was not send to database");
//       });
//   });
// };
