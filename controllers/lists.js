const Expense = require ('../models/expense');
const Product = require ('../models/product');

async function lists (req, res) {
    try {
        const lists = await Expense.find({'user.$id': req.body._id});
        res.json(lists);
    } catch (err) {
        res.json(err);
    }
}

async function list (req, res) {
    try {
        const list = await Expense.findById(req.params.id).select('_id name products extraInfo').sort({products: 1});
        res.json(list);
    } catch (err) {
        res.json(err);
    }
}

async function newList (req, res) {
    try {
        req.body.listObj.user = req.user._id;
        const newList = await Expense.create(req.body.listObj);
        res.json(newList._id);
    } catch (err) {
        res.json(err);
    }
}

async function deleteList (req, res) {
    try {
        await Expense.findOneAndDelete({_id:req.params.id});
        const lists = await Expense.find({'user.$id': req.body._id});
        res.json(lists);
    } catch (err) {
        res.json(err);
    }
}

async function newExpense (req, res) {
    try {
        console.log(req.body.newProduct, req.body.newItem);
        // let diffFlag = false;
        // const product = await Product.findById(req.body.newItem.productId);
        // for (key in req.body.newProduct) {
        //     if (!req.body.newProduct[key] && !product[key]){
        //         continue;
        //     }
        //     if (JSON.stringify(req.body.newProduct[key]) != JSON.stringify(product[key])) {
        //         diffFlag = true;
        //         break;
        //     }
        // }
        // if (diffFlag) {
        //     await Product.findById({_id: req.body.newItem.productId})
        //     .then(prod => {
        //         prod.kgPoundEa = req.body.newProduct.kgPoundEa;
        //         prod.description = req.body.newProduct.description;
        //         prod.price = Number(req.body.newProduct.price);
        //         prod.tax = Number(req.body.newProduct.tax) === 0 ? null : Number(req.body.newProduct.tax);
        //         prod.pricePerKgPound = Number(req.body.newProduct.pricePerKgPound) === 0 ? null : Number(req.body.newProduct.pricePerKgPound);
        //         prod.store = `${req.body.newProduct.store}`;
        //         prod.category = `${req.body.newProduct.category}`;
        //         prod.subCategory = `${req.body.newProduct.subCategory}`;
        //         prod.save();
        //     })
        // }
        // await Expense.findById(req.body.newItem.listId)
        // .then(list => {
        //     if (list) {
        //         let newProd = {
        //             quantity: Number(req.body.newItem.quantity) === 0 ? 1 : Number(req.body.newItem.quantity),
        //             price: Number(req.body.newProduct.price) === 0 ? null : Number(req.body.newProduct.price),
        //             extraCharges: Number(req.body.newItem.extraCharges) === 0 ? null : Number(req.body.newItem.extraCharges),
        //             discount: Number(req.body.newItem.discount) === 0 ? null : Number(req.body.newItem.discount),
        //             tax: Number(req.body.newProduct.tax) === 0 ? null : Number(req.body.newProduct.tax),
        //             product: `${req.body.newItem.productId}`,
        //             extraInfo: req.body.newItem.extraInfo
        //         }
        //         list.products.push(newProd);
        //         list.save();
        //     } else {
        //         res.status(404).json({error: 'List not found'})
        //     }
        // })
        // .catch ((err) => {
        //     res.status(500).json({error: 'Oh no!'});
        // });
        // //= fix the populate
        // // const data = await Expense.findById(req.body.newItem.listId).populate({path: 'expense.products'}).populate({path: 'products.product', select: ['quantity', 'price', 'tax', 'discount']})
        // const data = await Expense.findById(req.body.newItem.listId).populate('expense.products');
        // console.log(data)

        // res.json(data);
    } catch (err) {
        res.status(500).json({error: 'Oh no!'});
    }
}

async function deleteExpense (req, res) {
    try {
        console.log(req.body);
        res.json("delete expnse")
    } catch (err) {
        res.json(err);
    }
}

module.exports = {
    lists,
    list,
    newList,
    deleteList,
    newExpense,
    deleteExpense
}