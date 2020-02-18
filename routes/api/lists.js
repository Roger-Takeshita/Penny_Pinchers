const express = require('express');                     //! Require Express
const router = express.Router();                        //! Shorthand for router
const listsCtrl = require('../../controllers/lists');   //! Require Lists Controllers

//! Public routes

//! Private routes
    router.use(require('../../config/auth'));
    router.post('/', checkAuth, listsCtrl.myLists);


//! Helper functions
    function checkAuth(req, res, next) {
        if (req.user) return next();
        return res.status(401).json({ msg: 'Not Authorized' });
    }

module.exports = router;