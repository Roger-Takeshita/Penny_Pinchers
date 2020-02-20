import React, { Component } from 'react';
import { Form, Button, Col }from 'react-bootstrap'
import apiService from '../../utils/apiService';
import userService from '../../utils/userService';

class ProductFrom extends Component {
    state = {
        message: '',
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
        extraInfo:'',
    }

    handleChange = (e) => {
        this.setState({
            message: '',
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newProduct = {
                barCode: this.state.barCode,
                description: this.state.description,
                price: this.state.price,
                tax: this.state.tax,
                kgPoundEa: this.state.kgPoundEa,
                pricePerKgPound: this.state.pricePerKgPound,
                store: this.state.store,
                frequency: this.state.frequency,
                category: this.state.category,
                subCategory: this.state.subCategory,
                extraInfo: this.state.extraInfo,
                user: userService.getUser()._id
            }
            const data = await apiService.newProduct(newProduct, 'api/newproduct');
            this.setState({
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
                extraInfo:'',
                message: '',
            });
            this.props.updateData({data});
            this.props.history.push('/products');

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
                )
            });
        }
        if (this.props.dataCategories) {
            categories = this.props.dataCategories.map((category) => {
                return (
                    <>
                        <option key={category._id} value={category._id}>{category.name}</option>
                    </>
                )
            })
        }
        if (this.props.dataSubCategories) {
            subCategories = this.props.dataSubCategories.map((subCategory) => {
                return (
                    <>
                        <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
                    </>
                )
            })
        }

        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBarCode">
                            <Form.Label>Bar Code</Form.Label>
                            <Form.Control placeholder="Enter a bar code" name="barCode" value={this.state.barCode} onChange={this.handleChange} />
                            <Form.Text className="text-muted">(Optional)</Form.Text>
                        </Form.Group>
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
                            <Form.Label>Price$</Form.Label>
                            <Form.Control placeholder="XX.XX" name="pricePerKgPound" value={this.state.pricePerKgPound} onChange={this.handleChange} />
                            <Form.Text className="text-muted">(Optional)</Form.Text>
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

                    <Form.Group controlId="formExtraInfo">
                        <Form.Label>Extra Information</Form.Label>
                        <Form.Control as="textarea" rows="4" name="extraInfo" value={this.state.extraInfo} onChange={this.handleChange}/>
                        <Form.Text className="text-muted">(Optional)</Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={this.isFormInvalid()}>Submit</Button>
                </Form>
                <p>{this.state.message}</p>
            </>
        );
    };
};

export default ProductFrom;