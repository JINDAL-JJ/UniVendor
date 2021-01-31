const Message = require('../models/message')

module.exports.home = function(req, res) {
    return res.render('home', {
        title: "Home"
    })
}

module.exports.contactUs = function(req, res) {
    return res.render('contact_us', {
        title: "Contact Us"
    })
}

module.exports.message = function(req, res) {
    // console.log(req.body);
    Message.create(req.body, function(err, user){
        if(err){console.log('error in creating message'); return}
        console.log('message successfully submitted');
        return res.redirect('/');
    })
}

