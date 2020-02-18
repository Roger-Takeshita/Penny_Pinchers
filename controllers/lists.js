const Expense = require ('../models/Expense');

async function myLists (req, res) {
    console.log(req.body._id);
    const lists = await Expense.find({user: req.body._id}).where({closed: false})
    console.log(lists);
    res.json("Server is answering!")
}

module.exports = {
    myLists
}