const User = require('../models/user');         //! Import User Model
const jwt = require('jsonwebtoken');            //! Import jwt
const SECRET = process.env.SECRET_JWT;          //! Import jwt secret from .env

//! Create a token
    function createJWT(user) {
        return jwt.sign(
            {user},                                 //+ Data payload
            SECRET,                                 //+ Secret key to decode
            {expiresIn: '24h'}                      //+ Expiration date ("IN" automatically create the expiration data in our library)
        );
    }

//! Signup function
    async function signup(req, res) {
        const user = new User(req.body);
        try {
            await user.save();
            const token = createJWT(user);          //+ Be sure to first delete data that should not be in the token
            res.json({ token });
        } catch (err) {                             //+ Probably a duplicate email
            res.status(400).json(err);
        }
    }

module.exports = {
    signup
}