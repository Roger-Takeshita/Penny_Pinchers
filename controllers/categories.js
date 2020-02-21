const Category = require ('../models/category');

async function categories (req, res) {
    try {
        const categories = await Category.find({'user': req.body._id}).select('name').sort({name: 1});
        res.json(categories);
    } catch (err) {
        res.json(err);
    }
}

async function newCategory (req, res) {
    try {
        const valueExist = await Category.findOne({name: req.body.categoryName});
        if (!valueExist) {
            const newValue = {
                name: req.body.categoryName,
                user: req.user._id
            }
            await Category.create(newValue);
        }
        const categories = await Category.find({'user': req.body._id}).select('name').sort({name: 1});
        res.json(categories);
    } catch (err) {
        res.json(err);
    }
}

async function deleteCategory (req, res) {
    try {
        await Category.findOneAndDelete({_id:req.params.id});
        const categories = await Category.find({'user': req.body._id}).select('name').sort({name: 1});
        res.json(categories);
    } catch (err) {
        res.json(err);
    }
}

module.exports = {
    categories,
    newCategory,
    deleteCategory
}