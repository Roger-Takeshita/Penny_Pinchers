import tokenService from './tokenService';

function getMyLists () {
    const options = {
        method: 'GET',                                             //+ Method: Get
        headers: {                                                  //+ Headers
            'Content-type': 'application/json',                         //- Type Json
            'Authorization': 'Bearer ' + tokenService.getToken()        //- Pre-pending of the word Bearer to the token, followed by a space, then the token. This is a standard to follow when using token-based authentication
        }
    };
    return fetch('/api/mylists', options).then(res => res.json());
}

function getMyStores () {
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    };
    return fetch('/api/mystores', options).then(res => res.json());
}

function newStore (storeName) {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(storeName)
    };
    return fetch('/api/newstore', options).then(res => res.json());
}

function deleteStore (id) {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    };
    return fetch(`/api/deletestore/${id}`, options).then(res => res.json());
}

export default {
    getMyLists,
    getMyStores,
    newStore,
    deleteStore,
};