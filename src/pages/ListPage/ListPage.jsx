import React, { Component } from 'react';
// import styles from './ListPage.module.css';
import apiService from '../../utils/apiService';
import ProductListForm from '../../components/ProductListForm/ProductListForm';
import ResultsProductsList from '../../components/ResultsProductsList/ResultsProductsList';

class ListPage extends Component {
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
                apiService.getList(`/api/list/${this.props.match.params.id}`),
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

    // handleDeleteItem = async (id) => {
    //     try {
    //         const data = await apiService.deleteProductFromList(`/api/deleteproductfromlist/${id}`)
    //         this.setState({message: '', data})
    //         this.props.history.push(`/api/list/${this.props.match.params.id}`);
    //     } catch (err) {
    //         this.setState({message: err.message});
    //     }
    // }

    handleDeleteItem = async (listId, productId) => {
        try {
            const data = await apiService.deleteExpense(`/api/list/${listId}/${productId}`)
            this.setState({message: '', data});
            this.props.history.push(`/list/${listId}`);
        } catch (err) {
            this.setState({message: err.message});
        }
    }

    render () {
        if (this.state.dataFlag) {
            return (
                <>
                    <div className="container product-form">
                        <div>
                            <h2 className="form-title">{this.state.data.name}</h2>
                        </div>
                        <div className="form-descri">
                            {this.state.data.extraInfo}
                        </div>
                        <div className="form-form">
                            <ProductListForm {...this.props} data={this.state.data} dataStores={this.state.dataStores} dataCategories={this.state.dataCategories} dataSubCategories={this.state.dataSubCategories} updateData={this.updateData} />
                        </div>
                    </div>
                    <ResultsProductsList data={this.state.data} description1='List' description2='Lists' redirect={`/list/${this.props.match.params.id}`} handleDeleteItem={this.handleDeleteItem} updateData={this.updateData} />
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

export default ListPage;