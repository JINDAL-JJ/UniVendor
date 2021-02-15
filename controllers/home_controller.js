const Message = require("../models/message");
const Email = require("../config/email");

module.exports.home = function (req, res) {
  return res.render("home", {
    title: "Home",
  });
};

module.exports.contactUs = function (req, res) {
  return res.render("contact_us", {
    title: "Contact Us",
  });
};

module.exports.message = async function (req, res) {
  // console.log(req.body);
  Message.create(req.body, async function (err, user) {
    if (err) {
      console.log("error in creating message");
      return;
    }
    console.log("message successfully submitted");
    await new Email(req.body.email, req.body.name).sendMessage(
      req.body.subject,
      req.body.message
    );
    return res.redirect("/");
  });
};
