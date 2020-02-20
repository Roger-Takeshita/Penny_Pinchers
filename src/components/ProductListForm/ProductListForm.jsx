import React, { Component } from 'react';
import { Form, Button, Col }from 'react-bootstrap'
import apiService from '../../utils/apiService';

class ProductFrom extends Component {
    state = {
        message: '',
        productId: '',
        barCode: '',
        description: '',
        price: '',
        tax: '',
        kgPoundEa: '',
        pricePerKgPound: '',
        store: '',
        frequency: '',
        category: '',
        subCategory: '',
        extraInfoList:'',
        extraInfoProduct: '',
        extraCharges: '',
        discount: '',
        quantity: '',
        oneProduct: null
    }

    handleChange = (e) => {
        this.setState({
            message: '',
            [e.target.name]: e.target.value
        });
    }

    handleChangeBarCode = async (e) => {
        try {
            this.setState({
                [e.target.name]: e.target.value
            });
            const oneProduct = await apiService.getProduct(`/api/product/${e.target.value}`);
            if (oneProduct._id) {
                this.setState({
                    productId: oneProduct._id,
                    description: oneProduct.description,
                    price: oneProduct.price,
                    tax: oneProduct.tax,
                    kgPoundEa: oneProduct.kgPoundEa,
                    pricePerKgPound: oneProduct.pricePerKgPound,
                    store: oneProduct.store._id,
                    frequency: oneProduct.frequency,
                    category: oneProduct.category._id,
                    subCategory: oneProduct.subCategory._id,
                    extraInfoProduct: oneProduct.extraInfo,
                    message: ''
                })
            }
        } catch (err) {
            this.setState({
                message: 'Product not found!',
                productId: '',
                description: '',
                price: '',
                tax: '',
                kgPoundEa: '',
                pricePerKgPound: '',
                store: '',
                frequency: '',
                category: '',
                subCategory: '',
                extraInfoList:'',
                extraInfoProduct: '',
                extraCharges: '',
                discount: '',
                quantity: '',
                oneProduct: null
            });
        }
    }

    /* handleChangeProductName = async (e) => {
        try {
            this.setState({
                [e.target.name]: e.target.value
            });
            const oneProduct = await apiService.getProduct(`/api/product/name/${e.target.value}`);
            if (oneProduct) {
                this.setState({
                    description: oneProduct.description,
                    price: oneProduct.price,
                    tax: oneProduct.tax,
                    kgPoundEa: oneProduct.kgPoundEa,
                    pricePerKgPound: oneProduct.pricePerKgPound,
                    store: oneProduct.store._id,
                    frequency: oneProduct.frequency,
                    category: oneProduct.category._id,
                    subCategory: oneProduct.subCategory._id,
                    extraInfo: oneProduct.extraInfo,
                    extraCharges: '',
                    discount: '',
                    quantity: '',
                    message: ''
                })
            }
        } catch (err) {
            this.setState({message: 'Product not found!'});
        }
    } */

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newProduct = {
                barCode: this.state.barCode,
                description: this.state.description,
                extraInfo: this.state.extraInfoProduct,
                price: this.state.price,
                kgPoundEa: this.state.kgPoundEa,
                pricePerKgPound: this.state.pricePerKgPound,
                tax: this.state.tax,
                store: this.state.store,
                frequency: this.state.frequency,
                category: this.state.category,
                subCategory: this.state.subCategory,
                user: this.props.user._id
            }
            const newItem = {
                listId: this.props.data._id,
                extraInfo: this.state.extraInfoList,
                extraCharges: this.state.extraCharges,
                discount: this.state.discount,
                quantity: this.state.quantity,
                productId: this.state.productId,
                user: this.props.user._id
            }
            const data = await apiService.newExpense({newProduct, newItem}, `/api/list/${this.props.data._id}/newexpense`);
            this.setState({
                message: '',
                productId: '',
                barCode: '',
                description: '',
                price: '',
                tax: '',
                kgPoundEa: '',
                pricePerKgPound: '',
                store: '',
                frequency: '',
                category: '',
                subCategory: '',
                extraInfoList:'',
                extraInfoProduct: '',
                extraCharges: '',
                discount: '',
                quantity: '',
                oneProduct: null
            });
            console.log(data)
            this.props.updateData(data);
            // this.props.history.push(`/list/${this.props.data._id}`);

        } catch (err) {
            this.setState({message: err.message});
        }
    }

    isFormInvalid() {
        return !(this.state.description && this.state.price && this.state.store && this.state.frequency && this.state.category && this.state.subCategory);
    }

    render () {
        let stores, categories, subCategories;
        if (this.props.dataStores) {
            stores = this.props.dataStores.map((store) => {
                return (
                    <>
                        <option key={store._id} value={store._id}>{store.name}</option>
                    </>
                );
            });
        }
        if (this.props.dataCategories) {
            categories = this.props.dataCategories.map((category) => {
                return (
                    <>
                        <option key={category._id} value={category._id}>{category.name}</option>
                    </>
                );
            });
        }
        if (this.props.dataSubCategories) {
            subCategories = this.props.dataSubCategories.map((subCategory) => {
                return (
                    <>
                        <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
                    </>
                );
            });
        }
        return (
            <>
                <div className="container">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group controlId="nameForm">
                                <Form.Label>List Name: {this.props.data.name}</Form.Label>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="extraInfoFormProduct">
                                <Form.Label>Extra Info: {this.props.data.extraInfo}</Form.Label>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formBarCode">
                                <Form.Label>Bar Code</Form.Label>
                                <Form.Control placeholder="Enter a bar code" name="barCode" value={this.state.barCode} onChange={this.handleChangeBarCode} />
                                <Form.Text className="text-muted">(Optional)</Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">Scan</Button>
                        </Form.Row>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description *</Form.Label>
                            <Form.Control placeholder="T&T Dried Shiitake Mushrooms (454 g)" name="description" value={this.state.description} onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formPrice">
                                <Form.Label>Price$ *</Form.Label>
                                <Form.Control placeholder="XX.XX" name="price" value={this.state.price} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formTax">
                                <Form.Label>Tax%</Form.Label>
                                <Form.Control placeholder="XX.XX" name="tax" value={this.state.tax} onChange={this.handleChange} />
                                <Form.Text className="text-muted">(Optional)</Form.Text>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formScale">
                                <Form.Label>$/Kg / $/Lb / $Ea</Form.Label>
                                <Form.Control as="select" name="kgPoundEa" value={this.state.kgPoundEa} onChange={this.handleChange}>
                                    <option></option>
                                    <option>$/Kg</option>
                                    <option>$/Lb</option>
                                    <option>$Ea</option>
                                </Form.Control>
                                <Form.Text className="text-muted">(Optional)</Form.Text>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formPriceKg">
                                <Form.Label>Price$ *</Form.Label>
                                <Form.Control placeholder="XX.XX" name="pricePerKgPound" value={this.state.pricePerKgPound} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formStore">
                                <Form.Label>Store *</Form.Label>
                                <Form.Control as="select" name="store" value={this.state.store} onChange={this.handleChange}>
                                    <option></option>
                                    {stores}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formMonthly">
                                <Form.Label>Frequency *</Form.Label>
                                <Form.Control as="select" name="frequency" value={this.state.frequency} onChange={this.handleChange}>
                                    <option></option>
                                    <option>Monthly</option>
                                    <option>One Time</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formCategory">
                                <Form.Label>Category *</Form.Label>
                                <Form.Control as="select" name="category" value={this.state.category} onChange={this.handleChange}>
                                    <option></option>
                                    {categories}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formSubCategory">
                                <Form.Label>Sub-Category *</Form.Label>
                                <Form.Control as="select" name="subCategory" value={this.state.subCategory} onChange={this.handleChange}>
                                    <option></option>
                                    {subCategories}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="extraChargeForm">
                                <Form.Label>Extra Charges$ *</Form.Label>
                                <Form.Control placeholder="XX.XX" name="extraCharges" value={this.state.extraCharges} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="dicountForm">
                                <Form.Label>Discount$ *</Form.Label>
                                <Form.Control placeholder="XX.XX" name="discount" value={this.state.discount} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="quantityForm">
                                <Form.Label>Quantity *</Form.Label>
                                <Form.Control name="quantity" value={this.state.quantity} onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formExtraInfo">
                            <Form.Label>Extra Information</Form.Label>
                            <Form.Control as="textarea" rows="4" name="extraInfoList" value={this.state.extraInfoList} onChange={this.handleChange}/>
                            <Form.Text className="text-muted">(Optional)</Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={this.isFormInvalid()}>Submit</Button>
                    </Form>
                    <p>{this.state.message}</p>
                </div>
            </>
        );
    };
};

export default ProductFrom;