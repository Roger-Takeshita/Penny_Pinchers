const Expense = require ('../models/Expense');

async function myLists (req, res) {
    console.log(req.body._id);
    // const lists = Expense.find({user: req.body._id})
    res.json("Server is answering!")
}

module.exports = {
    myLists
}