import tokenService from './tokenService';
const BASE_URL = '/api/mylists';

function getMyLists(user) {
  const options = {
    method: 'POST',                                             //+ Method: Get
    headers: {                                                  //+ Headers
      'Content-type': 'application/json',                           //- Type Json
      'Authorization': 'Bearer ' + tokenService.getToken()            //- Pre-pending of the word Bearer to the token, followed by a space, then the token. This is a standard to follow when using token-based authentication
    },
    body: JSON.stringify(user)
  };
  return fetch(BASE_URL, options).then(res => res.json());
}

export default {
    getMyLists
};