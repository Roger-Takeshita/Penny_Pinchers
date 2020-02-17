//! Storing, retrieving and removing tokens from localStorage
    function setToken(token) {
        if (token) {                                                        //+ If token exists
            localStorage.setItem('token', token);                               //- Save to localStorage memory (client-side)
        } else {                                                            //+ Else
            localStorage.removeItem('token');                                   //- Remove this token from localStorage
        }
    };

//! Getting token and checking if it's still valid
    function getToken() {
        let token = localStorage.getItem('token');                          //+ pulling the token out of local storage
        if (token) {                                                        //+ If token exists
            const payload = JSON.parse(atob(token.split('.')[1]));              //- Get the token using split method
                                                                                    //? atob() - decoding a base-64 encoded string. It is used to decode a string of data which has been encoded using the btoa() method.
                                                                                    //? JSON.parse - Converting back a json object(
            if (payload.exp < Date.now() / 1000) {                              //-  Check if token is expired. JWT's expiration date is expressed in seconds
                localStorage.removeItem('token');                                   //? If token is expired, remove this token from localStorage
                token = null;                                                       //? Set variable 'token' to null
            }
        }
        return token;                                                       //+ Return token
    }

//! Getting user from token
    function getUserFromToken() {
        const token = getToken();                                           //+ Get the token
        return token ? JSON.parse(atob(token.split('.')[1])).user : null;   //+ Return user / null
    }

export default {
    setToken,
    getToken,
    getUserFromToken
};
  