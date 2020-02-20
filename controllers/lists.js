const Expense = require ('../models/expense');
const Product = require ('../models/product');

async function lists (req, res) {
    try {
        const lists = await Expense.find({'user.$id': req.body._id});
        res.json(lists);
    } catch (err) {
        console.log(err);
        res.json({error: err});
    }
}

async function list (req, res) {
    try {
        const list = await Expense.findById(req.params.id).select('_id name products extraInfo').sort({products: 1});
        res.json(list);
    } catch (err) {
        console.log(err);
        res.json({error: err});
    }
}

async function newList (req, res) {
    try {
        req.body.listObj.user = req.user._id;
        const newList = await Expense.create(req.body.listObj);
        res.json(newList._id);
    } catch (err) {
        console.log(err);
        res.json({error: err});
    }
}

async function deleteList (req, res) {
    try {
        await Expense.findOneAndDelete({_id:req.params.id});
        const lists = await Expense.find({'user.$id': req.body._id});
        res.json(lists);
    } catch (err) {
        console.log(err);
        res.json({error: err});
    }
}

async function newExpense (req, res) {
    try {
        let pId;
        if (req.body.newItem.productId !== '') {
            try {
                let diffFlag = false;
                const product = await Product.findById(req.body.newItem.productId);
                for (key in req.body.newProduct) {
                    if (!req.body.newProduct[key] && !product[key]){
                        continue;
                    }
                    if (JSON.stringify(req.body.newProduct[key]) != JSON.stringify(product[key])) {
                        diffFlag = true;
                        break;
                    }
                }
                if (diffFlag) {
                    let prod = await Product.findById({_id: req.body.newItem.productId})
                    prod.kgPoundEa = req.body.newProduct.kgPoundEa;
                    prod.description = req.body.newProduct.description;
                    prod.price = Number(req.body.newProduct.price);
                    prod.tax = Number(req.body.newProduct.tax) === 0 ? null : Number(req.body.newProduct.tax);
                    prod.pricePerKgPound = Number(req.body.newProduct.pricePerKgPound) === 0 ? null : Number(req.body.newProduct.pricePerKgPound);
                    prod.store = `${req.body.newProduct.store}`;
                    prod.category = `${req.body.newProduct.category}`;
                    prod.subCategory = `${req.body.newProduct.subCategory}`;
                    await prod.save();
                }
            } catch (err) {
                console.log(err);
                res.status(500).json({error: err});
            }
        } else {
            try {
                let newProduct = {
                    barCode: req.body.newProduct.barCode,
                    description: req.body.newProduct.description,
                    price: Number(req.body.newProduct.price),
                    tax: Number(req.body.newProduct.tax) === 0 ? null : Number(req.body.newProduct.tax),
                    kgPoundEa: req.body.newProduct.kgPoundEa,
                    pricePerKgPound: Number(req.body.newProduct.pricePerKgPound) === 0 ? null : Number(req.body.newProduct.pricePerKgPound),
                    store: `${req.body.newProduct.store}`,
                    frequency: req.body.newProduct.frequency,
                    category: `${req.body.newProduct.category}`,
                    subCategory: `${req.body.newProduct.subCategory}`,
                    extraInfo: req.body.newProduct.extraInfo,
                    user: `${req.body.newProduct.user}`
                }
                const product = await Product.create(newProduct);
                pId = `${product._id}`
            } catch (err) {
                console.log(err);
                res.status(500).json({error: err});
            }
        }
        if (!pId) {
            pId = req.body.newItem.productId;
        }
        try {
            let list = await Expense.findById(req.body.newItem.listId)
            if (list) {
                let newProd = {
                    quantity: Number(req.body.newItem.quantity) === 0 ? 1 : Number(req.body.newItem.quantity),
                    price: Number(req.body.newProduct.price),
                    extraCharges: Number(req.body.newItem.extraCharges) === 0 ? null : Number(req.body.newItem.extraCharges),
                    discount: Number(req.body.newItem.discount) === 0 ? null : Number(req.body.newItem.discount),
                    tax: Number(req.body.newProduct.tax) === 0 ? null : Number(req.body.newProduct.tax),
                    product: `${pId}`,
                    extraInfo: req.body.newItem.extraInfo
                }
                list.products.push(newProd);
                await list.save();
            } else {
                res.status(404).json({error: 'List not found'})
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({error: err});
        }    
        try {
            const data = await Expense.findById(req.body.newItem.listId)
            .select('-createdAt -updatedAt -user -products.createdAt -products.updatedAt')
            .populate({
                path: 'products.product',
                select: ['-createdAt', '-updatedAt', '-user', '-price', '-tax', '-pricePerKgPound'],
                populate: {
                    path: 'store category subCategory',
                    select: ['-createdAt', '-updatedAt', '-user']
                }
            });
            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({error: err});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err});
    }
}

async function deleteExpense (req, res) {
    try {
        console.log(req.body);
        res.json("delete expnse")
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err});
    }
}

async function getUserBalance (req, res) {
    try {
        //= need to query all the expenses of the month
        const data = await Expense.findById(req.params.id).select('_id name products extraInfo').sort({products: 1});
        res.json(data);
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err});
    }
 
}

module.exports = {
    lists,
    list,
    newList,
    deleteList,
    newExpense,
    deleteExpense,
    getUserBalance
}