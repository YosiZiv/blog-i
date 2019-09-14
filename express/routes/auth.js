const express = require('express');

// initalizing express router
const router = express.Router();

const { register, login } = require('../handlers/auth');

//  @route POST api/auth/register
//  @desc Register a User
//  @access Public
router.post('/register', register);

//  @route POST api/auth/login
//  @desc Login User / Returning JWT Token
//  @access Public
router.post('/login', login);

//  @route GET api/auth/current
//  @desc Return current user
//  @access Private
// router.get('/current', passport.authenticate('jwt', { session: false }), current);

module.exports = router;
