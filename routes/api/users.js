const express = require('express');                     //! Require Express
const router = express.Router();                        //! Shorthand for router
const usersCtrl = require('../../controllers/users');   //! Require Users Controllers

//! Public routes
    router.post('/signup', usersCtrl.signup);
    router.post('/login', usersCtrl.login);

module.exports = router;