const mongoose = require('mongoose');       //! Require mongoose
const Schema = mongoose.Schema;             //! Shorthand for mongoose.Schema

const categorySchema = new Schema (
    {
        name: {
            type: String,
            required: true,
            unique: true
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

module.exports = mongoose.model('Category', categorySchema);