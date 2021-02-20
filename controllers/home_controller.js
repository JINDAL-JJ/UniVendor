const Message = require("../models/message");
const Email = require("../config/email");

module.exports.home = function (req, res) {
  return res.render("home", {
    title: "Home",
    message: req.flash('message')
  });
};

module.exports.contactUs = function (req, res) {
  return res.render("contact_us", {
    title: "Contact Us",
    message: req.flash('message')
  });
};

module.exports.message = async function (req, res) {
  Message.create(req.body, async function (err, msg) {
    if (err) {
      req.flash('message',err);
      console.log("error in creating message");
      return;
    }
    // console.log("message successfully submitted");
     req.flash('message','Success');
    await new Email(req.body.email, req.body.name).sendMessage(
      req.body.subject,
      req.body.message
    );
    return res.redirect("/contactUs");
  });
};




