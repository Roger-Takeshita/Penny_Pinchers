const mongoose = require('mongoose');       //! Require mongoose
const Schema = mongoose.Schema;             //! Shorthand for mongoose.Schema

const prodSchema = new Schema (
    {
        quantity: {
            type: Number,
            default: 1,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        extraCharges: {
            type: Number
        },
        discount: {
            type: Number
        },
        tax: {
            type: Number
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        extraInfo: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const expenseSchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        extraInfo: {
            type: String,
            default: ''
        },
        closed: {
            type: Boolean,
            default: false
        },
        products:[prodSchema],
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Expense', expenseSchema);