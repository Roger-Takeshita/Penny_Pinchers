const SubCategory = require ('../models/subCategory');

async function subCategories (req, res) {
    try {
        const subCategories = await SubCategory.find({'user.$id': req.body._id}).select('name').sort({name: 1});
        res.json(subCategories);
    } catch (err) {
        res.json(err);
    }
}

async function newSubCategory (req, res) {
    try {
        console.log(req.body);
        const valueExist = await SubCategory.findOne({name: req.body.subCategoryName}).sort({name: 1});
        if (!valueExist) {
            const newValue = {
                name: req.body.subCategoryName,
                user: req.user._id
            }
            await SubCategory.create(newValue);
        }
        const subCategories = await SubCategory.find({'user.$id': req.body._id}).select('name').sort({name: 1});
        res.json(subCategories);
    } catch (err) {
        res.json(err);
    }
}

async function deleteSubCategory (req, res) {
    try {
        await SubCategory.findOneAndDelete({_id:req.params.id});
        const subCategories = await SubCategory.find({'user.$id': req.body._id}).select('name').sort({name: 1});
        res.json(subCategories);
    } catch (err) {
        res.json(err);
    }
}

module.exports = {
    subCategories,
    newSubCategory,
    deleteSubCategory
}