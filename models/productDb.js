const mongoose = require('mongoose');       //! Require mongoose
const Schema = mongoose.Schema;             //! Shorthand for mongoose.Schema

const productSchema = new Schema (
    {
        barCode: {
            type: String
        },
        description: {
            type: String,
            required: true,
            unique: true
        },
        extraInfo: {
            type: String
        },
        price: {
            type: Number,
            required: true
        },
        kgPoundEa: {
            type: String,
            enum: ["", "$/Kg", "$/Lb", "$Ea"],
            default: ""
        },
        pricePerKgPound: {
            type: Number
        },
        tax: {
            type: Number
        },
        store: {
            type: Schema.Types.ObjectId,
            ref: 'Store',
            required: true
        },
        categoryOne: {
            type: String,
            enum: ["Monthly", "One Time"],
            required: true
        },
        categoryTwo: {
            type: Schema.Types.ObjectId,
            ref: 'CategoryTwo',
            required: true
        },
        categoryThree: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', productSchema);