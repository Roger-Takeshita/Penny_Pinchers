const mongoose = require('mongoose');       //! Require mongoose
const Schema = mongoose.Schema;             //! Shorthand for mongoose.Schema
const bcrypt = require('bcrypt');           //! Require bcrypt
const SALT_ROUNDS = 6;                      //! bcrypt has a setting that tells it how many times to randomize the generation of salt. Usually 6 is enough.

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String, 
            required: true, 
            lowercase: true, 
            unique: true
        },
        password: {
            type: String,
            // select: false                //! Never query back the password
        },
        avatar: {
            type: String
        },
        googleId: {
            type: String
        },
        admin: {
            type: Boolean,
            default: false
        },
    }, 
    {
        timestamps: true
    }
);

//! Mongoose Middleware - Encrypt the password
    userSchema.pre('save', function(next) {                           //! pre middleware, also as known as 'hook'
        const user = this;                                                  //+ this will be set to the current user
        if (!user.isModified('password')) return next();                    //+ If the password hasn't changed, return call next() function
        bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {       //+ If password has changed - salt and hash it. This is an async function, so we pass a function
            if (err) return next(err);                                          //- check if you got any error
            user.password = hash;                                               //- replace the user provided password with the hased password
            next();                                                             //- I need to call the next() function
        });
    });

//! bcrypt includes a compare method for verifying that a cleartext password matches a given hash.
    userSchema.methods.comparePassword = function(tryPassword, cb) {
        bcrypt.compare(tryPassword, this.password, cb);
    };

//! Remove the password property when serializing doc to JSON
    userSchema.set('toJSON', {
        transform: function(doc, ret) {
            delete ret.password;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.admin;
            return ret;
        }
    });

module.exports = mongoose.model('User', userSchema);