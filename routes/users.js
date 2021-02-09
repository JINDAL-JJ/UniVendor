const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/profile', passport.checkAuthentication, userController.profile);
router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);

router.post('/create', userController.create);

//use passport as middleware too authenticate
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
 ) , userController.createSession); 

router.get('/sign-out', userController.destroySession);

// router.post('/createPost', userController.postUpload)

module.exports = router; 