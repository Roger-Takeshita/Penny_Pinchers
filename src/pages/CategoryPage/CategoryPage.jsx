import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../StoreCategorySubCategory.module.css';
import apiService from '../../utils/apiService';
import ResultsStoreCategory from '../../components/ResultsStoreCategory/ResultsStoreCategory';

class CategoryOnePage extends Component {
    state = {
        name: '',
        message: '',
        data: null
    }

    async componentDidMount() {
        const data = await apiService.getStoresCategoriesSubCategories('/api/categories');
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
        const data = await apiService.newStoreCategorySubCategory({categoryName: this.state.name}, 'api/newcategory');
        this.props.history.push('/categories');
        this.setState({name: '', data})
    } catch (err) {
        this.setState({message: err.message});
    }
    }

    handleDelete = async (id) => {
        try {
            const data = await apiService.deleteStoreCategorySubCategory(`/api/deletecategory/${id}`)
            this.props.history.push('/categories');
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
                        <h2>Category Management</h2>
                    </div>
                    <div className={styles.StoreCategorySubCategoryPageFormDiv}>
                        <form className={styles.StoreCategorySubCategoryPageForm} onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="descriptionInput">Add a Category</label>
                                <input className="form-control" value={this.state.name} name="name" onChange={this.handleChange} id="descriptionInput" placeholder="Name"/>
                                <button className={this.isFormInvalid() ? `${styles.buttonInvalid} btn btn-default` : `${styles.buttonValid} btn btn-default`} disabled={this.isFormInvalid()}>Submit</button>&nbsp;&nbsp;&nbsp;
                                <Link to='/categories' className='buttonCancel' onClick={() => this.setState({name: ''})}>Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <div><p>{this.state.message}</p></div>
                    <ResultsStoreCategory description1='Category' description2='Categories' redirect='/categories' data={this.state.data} handleDelete={this.handleDelete} />
                </div>
            </>
        );
    };
};

export default CategoryOnePage;