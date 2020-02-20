const express = require('express');                     //! Require Express
const router = express.Router();                        //! Shorthand for router
const listCtrl = require('../../controllers/lists');   //! Require Lists Controllers
const storeCtrl = require('../../controllers/stores');
const categoryCtrl = require('../../controllers/categories');
const subCategoryCtrl = require('../../controllers/subCategories');
const productCtrl = require('../../controllers/products');

//! Public routes

//! Private routes
    router.use(require('../../config/auth'));
    router.get('/stores/', checkAuth, storeCtrl.stores);
    router.post('/newstore', checkAuth, storeCtrl.newStore);
    router.delete('/deletestore/:id', checkAuth, storeCtrl.deleteStore);
    router.get('/categories/', checkAuth, categoryCtrl.categories);
    router.post('/newcategory', checkAuth, categoryCtrl.newCategory);
    router.delete('/deletecategory/:id', checkAuth, categoryCtrl.deleteCategory);
    router.get('/subcategories/', checkAuth, subCategoryCtrl.subCategories);
    router.post('/newsubcategory', checkAuth, subCategoryCtrl.newSubCategory);
    router.delete('/deletesubcategory/:id', checkAuth, subCategoryCtrl.deleteSubCategory);
    router.get('/products/', checkAuth, productCtrl.products);
    router.get('/product/:id', checkAuth, productCtrl.productId);
    router.get('/product/name/:id', checkAuth, productCtrl.productName);
    router.post('/newproduct', checkAuth, productCtrl.newProduct);
    router.delete('/deleteproduct/:id', checkAuth, productCtrl.deleteProduct);
    router.get('/lists/', checkAuth, listCtrl.lists);
    router.get('/list/:id', checkAuth, listCtrl.list);
    router.post('/list/:id/newexpense', checkAuth, listCtrl.newExpense);
    router.delete('/list/:id/:prodId', checkAuth, listCtrl.deleteExpense);
    router.post('/newlist', checkAuth, listCtrl.newList);
    router.delete('/deletelist/:id', checkAuth, listCtrl.deleteList);
    router.get('/user/:id', checkAuth, listCtrl.getUserBalance);

//! Helper functions
    function checkAuth(req, res, next) {
        if (req.user) return next();
        return res.status(401).json({ msg: 'Not Authorized' });
    }

module.exports = router;