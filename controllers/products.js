const Product = require('../models/product');

async function products (req, res) {
    try {
        const products = await Product.find({'user.$id': req.body._id}).populate('store category subCategory').select(['_id', 'barCode', 'description', 'price', 'tax', 'kgPoundEa', 'pricePerKgPound', 'store', 'frequency', 'category', 'subCategory', 'extraInfo']).sort({description: 1});
        res.json(products);
    } catch (err) {
        res.json(err);
    }
}

async function newProduct (req, res) {
    try {
        const product = await Product.findOne({description: req.body.description});
        if (!product) {
            await Product.create(req.body);
        }
        const products = await Product.find({'user.$id': req.body._id}).populate('store category subCategory').select(['_id', 'barCode', 'description', 'price', 'tax', 'kgPoundEa', 'pricePerKgPound', 'store', 'frequency', 'category', 'subCategory', 'extraInfo']).sort({description: 1});
        res.json(products);
    } catch (err) {
        res.json(err);
    }
}

async function deleteProduct (req, res) {
    try {
        await Product.findOneAndDelete({_id:req.params.id});
        const products = await Product.find({'user.$id': req.body._id}).populate('store category subCategory').select(['_id', 'barCode', 'description', 'price', 'tax', 'kgPoundEa', 'pricePerKgPound', 'store', 'frequency', 'category', 'subCategory', 'extraInfo']).sort({description: 1});
        res.json(products);
    } catch (err) {
        res.json(err);
    }
}

module.exports = {
    products,
    newProduct,
    deleteProduct
}