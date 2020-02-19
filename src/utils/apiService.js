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

//! ----------------------------- API Request - Stores / Categories / Sub-Categories
    function getStoresCategoriesSubCategories (apiPath) {
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + tokenService.getToken()
            }
        };
        return fetch(apiPath, options).then(res => res.json());
    }

    function newStoreCategorySubCategory (name, apiPath) {
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + tokenService.getToken()
            },
            body: JSON.stringify(name)
        };
        return fetch(apiPath, options).then(res => res.json());
    }

    function deleteStoreCategorySubCategory (apiPath) {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + tokenService.getToken()
            }
        };
        return fetch(apiPath, options).then(res => res.json());
    }

//! ----------------------------- API Request - Products
    function getProducts (apiPath) {
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + tokenService.getToken()
            }
        };
        return fetch(apiPath, options).then(res => res.json());
    }

    function newProduct (productObj, apiPath) {
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + tokenService.getToken()
            },
            body: JSON.stringify(productObj)
        };
        return fetch(apiPath, options).then(res => res.json());
    }

    function deleteProduct (apiPath) {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + tokenService.getToken()
            }
        };
        return fetch(apiPath, options).then(res => res.json());
    }

export default {
    getMyLists,
    getStoresCategoriesSubCategories,
    newStoreCategorySubCategory,
    deleteStoreCategorySubCategory,
    getProducts,
    newProduct,
    deleteProduct
};