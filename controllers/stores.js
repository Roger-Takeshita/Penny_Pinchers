const Store = require ('../models/store');

async function myStores (req, res) {
    const stores = await Store.find({'user.$id': req.body._id}).select('name')
    res.json(stores)
}

async function newStore (req, res) {
    try {
        const storeExist = await Store.findOne({name: req.body.storeName})
        if (!storeExist) {
            const newS = {
                name: req.body.storeName,
                user: req.user._id
            }
            await Store.create(newS)
        }
        const stores = await Store.find({'user.$id': req.body._id}).select('name')
        res.json(stores)
    } catch (err) {
        res.json(err);
    }
}

async function deleteStore (req, res) {
    try {
        await Store.findOneAndDelete({_id:req.params.id});
        const stores = await Store.find({'user.$id': req.body._id}).select('name')
        res.json(stores)
    } catch (err) {
        res.json(err);
    }
}

module.exports = {
    myStores,
    newStore,
    deleteStore
}