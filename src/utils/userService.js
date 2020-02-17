import tokenService from './tokenService';                              //! Import tokenService
const BASE_URL = '/api/users/';                                         //! Base Users API URL

//! Singup Fetch Request
    function signup(user) {
        return fetch(BASE_URL + 'signup', {                                 //+ Fetch (/api/users/signup)
            method: 'POST',                                                     //- Method POST
            headers: new Headers({ 'Content-Type': 'application/json' }),       //- Send headers as JSON
            body: JSON.stringify(user)                                          //- Stringfy user info
        })
        .then(res => {
            if (res.ok) return res.json();                                  //+ If the singup was successful
            throw new Error('Email already taken!');                        //+ Otherwise trow an error
        })
        .then(({ token }) => {                                              //+ From the return of the successful signup (destructor) to get just the token
            tokenService.setToken(token);                                       //- Save the token to localStorage
        });
    }

//! Login Fetch Request
    function login(creds) {
        return fetch(BASE_URL + 'login', {                                  //+ Fetch (/api/users/login)
            method: 'POST',                                                     //- Method POST
            headers: new Headers({ 'Content-Type': 'application/json' }),       //- Send headers as Json
            body: JSON.stringify(creds)                                         //- Stringfy credentials
        })
        .then(res => {
            if (res.ok) return res.json();                                  //+ If the login was successful
            throw new Error('Bad Credentials!');                            //+ Otherwise trow an error
        })
        .then(({ token }) => {                                              //+ From the return of the successful login (destructor) to get just the token
            tokenService.setToken(token);                                       //- Save the token to localStorage
        });
    }

//! Get User from Token
function getUser() {
    return tokenService.getUserFromToken();
}

//! Logout - Remove token
    function logout() {
        return tokenService.setToken();
    }

export default {
    signup,
    getUser,
    logout,
    login
};
