const express = require('express');                     //! Require Express
const router = express.Router();                        //! Shorthand for router
const listCtrl = require('../../controllers/lists');   //! Require Lists Controllers
const storeCtrl = require('../../controllers/stores');

//! Public routes

//! Private routes
    router.use(require('../../config/auth'));
    router.get('/mylists/', checkAuth, listCtrl.myLists);
    router.get('/mystores/', checkAuth, storeCtrl.myStores);
    router.post('/newstore', checkAuth, storeCtrl.newStore);
    router.delete('/deletestore/:id', checkAuth, storeCtrl.deleteStore);


//! Helper functions
    function checkAuth(req, res, next) {
        if (req.user) return next();
        return res.status(401).json({ msg: 'Not Authorized' });
    }

module.exports = router;