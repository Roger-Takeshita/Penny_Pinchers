import React, { Component } from 'react';
import styles from './ProductPage.module.css';

class ProductPage extends Component {
    render () {
        return (
            <div className={styles.ProductPageFormDiv}>
                <form className={styles.ProductPageForm}>
                    <div className="form-group col-sm-6">
                        <label htmlFor="barCodeInput">Bar Code</label>
                        <input type="text" className="form-control" id="barCodeInput" placeholder="123456789" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descriptionInput">Description</label>
                        <input type="text" className="form-control" id="descriptionInput" placeholder="T&T Dried Shiitake Mushrooms (454 g)" />
                    </div>
                    <div className="form-group col-sm-4">
                        <label htmlFor="priceInput">Price</label>
                        <input type="text" className="form-control" id="priceInput" placeholder="" />
                        <label htmlFor="taxInput">Tax</label>
                        <input type="text" className="form-control" id="taxInput" placeholder="" />
                    </div>
                    <div className="form-group col-sm-4">
                        <label htmlFor="unitPriceSelector">$/Kg / $/Lb / $Ea</label>
                        <select className="form-control" id="unitPriceSelector">
                            <option></option>
                            <option>$/Kg</option>
                            <option>$/Lb</option>
                            <option>$Ea</option>
                        </select>
                        <input type="text" className="form-control" id="unitPriceSelector" placeholder="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="storeSelector">Store</label>
                        <select className="form-control" id="storeSelector">
                            <option>Superstore</option>
                            <option>T & T</option>
                            <option>No Frills</option>
                            <option>Costco</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="monthlySelector">Monthly / One Time</label>
                        <select className="form-control" id="monthlySelector">
                            <option>Monthly</option>
                            <option>One Time</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="unitPriceSelector">Category</label>
                        <select className="form-control" id="unitPriceSelector">
                            <option>Food</option>
                            <option>Drink</option>
                            <option>Eating Out</option>
                            <option>Personal</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="subCategorySelection">Sub Category</label>
                        <select className="form-control" id="subCategorySelection">
                            <option>Banana</option>
                            <option>Grape</option>
                            <option>Steak</option>
                            <option>Water</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="extraInfoInput">Extra Information:</label>
                        <textarea className="form-control" id="extraInfoInput" rows="3"></textarea>
                    </div>
                </form>
            </div>
        );
    };
};

export default ProductPage;