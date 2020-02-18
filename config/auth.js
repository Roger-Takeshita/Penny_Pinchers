const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_JWT;

module.exports = function(req, res, next) {
    let token = req.get('Authorization') || req.query.token || req.body.token;  //+ Check for the token being sent in three different ways
    if (token) {                                                                //+  If Token
        token = token.replace('Bearer ', '');                                       //- Remove the 'Bearer ' if it was included in the token header
        jwt.verify(token, SECRET, function(err, decoded) {                          //- Check if token is valid and not expired
            if (err) {                                                                  //? If Error
                next(err);                                                                  //> Call next function and send the error
            } else {                                                                    //? Else
                req.user = decoded.user;                                                    //> It's a valid token, so add user to req
                next();                                                                     //> Call next function
            }
        });
    } else {                                                                    //+ Else - If Token doesn't exisit
        next();                                                                     //- Call next function
    }
};
