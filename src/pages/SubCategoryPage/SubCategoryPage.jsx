import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../StoreCategorySubCategory.module.css';
import apiService from '../../utils/apiService';
import ResultsStoreCategory from '../../components/ResultsStoreCategory/ResultsStoreCategory';

class CategoryTwoPage extends Component {
    state = {
        name: '',
        message: '',
        data: null
    }

    async componentDidMount() {
        const data = await apiService.getStoresCategoriesSubCategories('/api/subcategories');
        this.setState({data})
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
            const data = await apiService.newStoreCategorySubCategory({subCategoryName: this.state.name}, 'api/newsubcategory');
            this.props.history.push('/subcategories');
            this.setState({name: '', data})
        } catch (err) {
            this.setState({message: err.message});
        }
    }

    handleDelete = async (id) => {
        try {
            const data = await apiService.deleteStoreCategorySubCategory(`/api/deletesubcategory/${id}`)
            this.props.history.push('/subcategories');
            this.setState({name: '', data})
        } catch (err) {
            this.setState({message: err.message});
        }
    }

    isFormInvalid() {
        return !(this.state.name);
    }

    render () {
        return (
            <>
                <div className="container">
                    <div className="title-page">
                        <h2>Sub-Category DB</h2>
                    </div>
                    <div className={styles.StoreCategorySubCategoryPageFormDiv}>
                        <form className={styles.StoreCategorySubCategoryPageForm} onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="descriptionInput">Add a Sub-Category</label>
                                <input className="form-control" value={this.state.name} name="name" onChange={this.handleChange} id="descriptionInput" placeholder="Name"/>
                                <button className={this.isFormInvalid() ? `${styles.buttonInvalid} btn btn-default` : `${styles.buttonValid} btn btn-default`} disabled={this.isFormInvalid()}>Submit</button>&nbsp;&nbsp;&nbsp;
                                <Link to='/subcategories' onClick={() => this.setState({name: ''})} className="delete-cancel">Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <div><p>{this.state.message}</p></div>
                    <ResultsStoreCategory description1='Sub-Category' description2='Sub-Categories' redirect='/subcategories' data={this.state.data} handleDelete={this.handleDelete} />
                </div>
            </>
        );
    };
};

 export default CategoryTwoPage;