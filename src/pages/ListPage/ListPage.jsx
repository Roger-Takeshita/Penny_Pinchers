import React, { Component } from 'react';
import styles from './ListPage.module.css';
import apiService from '../../utils/apiService';
import ProductListForm from '../../components/ProductListForm/ProductListForm';

class ListPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: null,
            dataStores: null,
            dataCategories: null,
            dataSubCategories: null,
            count: 0
        };
    }

    async componentDidMount() {
        const data = await apiService.getList(`/api/list/${this.props.match.params.id}`);
        this.setState({cout:1, data})
        const dataStores = await apiService.getStoresCategoriesSubCategories('/api/stores');
        this.setState({count:2, dataStores})
        const dataCategories = await apiService.getStoresCategoriesSubCategories('/api/categories');
        this.setState({count:3, dataCategories})
        const dataSubCategories = await apiService.getStoresCategoriesSubCategories('/api/subcategories');
        this.setState({count:4, dataSubCategories})

    }

    updateData(data) {
        this.setState({data: data})
    }

    handleDeleteItem = async (id) => {
        try {
            const data = await apiService.deleteProduct(`/api/deletelist/${id}`)
            this.setState({message: '', data})
            this.props.history.push(`/api/list/${this.props.match.params.id}`);
        } catch (err) {
            this.setState({message: err.message});
        }
    }

    render () {
        if (this.state.count === 4) {
            return (
                <>
                    <div className={styles.ProductPageFormDiv}>
                        <ProductListForm {...this.props} data={this.state.data} dataStores={this.state.dataStores} dataCategories={this.state.dataCategories} dataSubCategories={this.state.dataSubCategories} updateData={this.updateData} />
                    </div>
                    {/* <ResultsProducts description1='Product' description2='Products' redirect='/products' data={this.state.data} handleDelete={this.handleDelete} updateData={this.updateData} /> */}
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