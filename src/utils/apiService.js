import tokenService from './tokenService';

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

    function getProduct (apiPath) {
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
//! ----------------------------- API Request - Lists of Expenses
    function getLists (apiPath) {
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + tokenService.getToken()
            }
        };
        return fetch(apiPath, options).then(res => res.json());
    }

    function getList (apiPAth) {
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + tokenService.getToken()
            }
        };
        return fetch(apiPAth, options).then(res => res.json());
    }

    function newExpense (obj, apiPath) {
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + tokenService.getToken()
            },
            body: JSON.stringify(obj)
        };
        return fetch(apiPath, options).then(res => res.json());
    }

    function newList (listObj, apiPath) {
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + tokenService.getToken()
            },
            body: JSON.stringify(listObj)
        };
        return fetch(apiPath, options).then(res => res.json());
    }

    function deleteList (apiPath) {
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
    getStoresCategoriesSubCategories,
    newStoreCategorySubCategory,
    deleteStoreCategorySubCategory,
    getProducts,
    getProduct,
    newProduct,
    deleteProduct,
    getLists,
    getList,
    newList,
    deleteList,
    newExpense,
};