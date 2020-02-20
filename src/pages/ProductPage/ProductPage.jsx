import React, { Component } from 'react';
import ProductForm from '../../components/ProductForm/ProductForm';
import ResultsProducts from '../../components/ResultsProducts/ResultsProducts';
import apiService from '../../utils/apiService';

class ProductPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: null,
            dataStores: null,
            dataCategories: null,
            dataSubCategories: null,
            dataFlag: false
        };
    }

    async componentDidMount() {
        try {
            const [data, dataStores, dataCategories, dataSubCategories] = await Promise.all([
                apiService.getProducts('/api/products'),
                apiService.getStoresCategoriesSubCategories('/api/stores'),
                apiService.getStoresCategoriesSubCategories('/api/categories'),
                apiService.getStoresCategoriesSubCategories('/api/subcategories')
            ]);
            this.setState({
                data,
                dataStores,
                dataCategories,
                dataSubCategories,
                dataFlag: true
            })
        } catch (err) {
            this.setState({
                data: null,
                dataStores: null,
                dataCategories: null,
                dataSubCategories: null,
                dataFlag: false
            })
            console.log(err);
        }
    }
    
    updateData = (data) => {
        this.setState({data})
    }

    handleDelete = async (id) => {
        try {
            const data = await apiService.deleteProduct(`/api/deleteproduct/${id}`)
            this.props.history.push('/products');
            this.setState({message: '', data})
        } catch (err) {
            this.setState({message: err.message});
        }
    }

    render () {
        if (this.state.dataFlag) {
            return (
                <>
                    <div className="container">
                        <div className="title-page">
                            <h2>Product Management</h2>
                        </div>
                        <ProductForm {...this.props} dataStores={this.state.dataStores} dataCategories={this.state.dataCategories} dataSubCategories={this.state.dataSubCategories} updateData={this.updateData} />
                    </div>
                    <ResultsProducts description1='Product' description2='Products' redirect='/products' data={this.state.data} handleDelete={this.handleDelete} updateData={this.updateData} />
                </>
            );
        } else {
            return(
                <>
                    <div>Loading...</div>
                </>
            )
        }
    };
};

export default ProductPage;