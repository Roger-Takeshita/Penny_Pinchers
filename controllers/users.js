const User = require('../models/user');                                     //! Import User Model
const jwt = require('jsonwebtoken');                                        //! Import jwt
const SECRET = process.env.SECRET_JWT;                                      //! Import jwt secret from .env

//! Create a token
    function createJWT(user) {
        return jwt.sign(                                                        //+ Call jwt.sign
            {user},                                                                 //- Data payload
            SECRET,                                                                 //- Secret key to decode
            {expiresIn: '24h'}                                                      //- Expiration date ("IN" automatically create the expiration data in our library)
        );
    }

//! Signup function
    async function signup(req, res) {
        const user = new User(req.body);                                        //+ Create a new user variable from req.body
        try {                                                                   //+ Catching erros
            await user.save();                                                      //- Await to save the new user
            const token = createJWT(user);                                          //- Create a new token with the new user. Delete data that should not be in the token
            res.json({ token });                                                    //- Response as json file the token
        } catch (err) {                                                         //+ If error
            res.status(400).json(err);                                              //- Probably a duplicate email
        }
    }

//! Login function
    async function login(req, res) {
        try {                                                                   //+ Catching erros
            const user = await User.findOne({email: req.body.email});               //- Await mongodb to find the user
            if (!user) return res.status(401).json({err: 'bad credentials'});       //- If user not found, response 401
            user.comparePassword(req.body.password, (err, isMatch) => {             //- Compare password
                if (isMatch) {                                                          //? If match
                    const token = createJWT(user);                                          //> Create a new token for this user
                    res.json({token});                                                      //> Response the token as json file
                } else {                                                                //? Else
                    return res.status(401).json({err: 'bad credentials'});                  //> If password not match, response 401 error
                }
            });
        } catch (err) {                                                         //+ If error
            return res.status(401).json(err);                                       //- Reponse 401 error
        }
    }

module.exports = {
    signup,
    login
}