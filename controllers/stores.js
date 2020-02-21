const Store = require ('../models/store');

async function stores (req, res) {
    try {
        const stores = await Store.find({'user': req.user._id}).select('name').sort({name: 1});
        res.json(stores);
    } catch (err) {
        res.json(err);
    }
}

async function newStore (req, res) {
    try {
        const valueExist = await Store.findOne({name: req.body.storeName});
        if (!valueExist) {
            const newValue = {
                name: req.body.storeName,
                user: req.user._id
            }
            await Store.create(newValue);
        }
        const stores = await Store.find({'user': req.user._id}).select('name').sort({name: 1});
        res.json(stores);
    } catch (err) {
        res.json(err);
    }
}

async function deleteStore (req, res) {
    try {
        await Store.findOneAndDelete({_id:req.params.id});
        const stores = await Store.find({'user': req.user._id}).select('name').sort({name: 1});
        res.json(stores);
    } catch (err) {
        res.json(err);
    }
}

module.exports = {
    stores,
    newStore,
    deleteStore
}