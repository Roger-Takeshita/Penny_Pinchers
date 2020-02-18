import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './StorePage.module.css';
import apiService from '../../utils/apiService';
import ResultsStoreCategory from '../../components/ResultsStoreCategory/ResultsStoreCategory';

class StorePage extends Component {
    state = {
        name: '',
        message: '',
        data: null
    }

    async componentDidMount() {
        const data = await apiService.getMyStores(this.props.user);
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
        const data = await apiService.newStore({storeName: this.state.name});
        this.props.history.push('/stores');
        this.setState({name: '', data})
      } catch (err) {
        this.setState({message: err.message});
      }
    }

    handleDelete = async (id) => {
        try {
            const data = await apiService.deleteStore(id)
            this.props.history.push('/stores');
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
            <div className={styles.StorePageFormDiv}>
                <form className={styles.StorePageForm} onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="descriptionInput">Store's Name</label>
                        <input type="text" className="form-control" value={this.state.name} name="name" onChange={this.handleChange} id="descriptionInput" placeholder=""/>
                        <button className={this.isFormInvalid() ? `${styles.buttonInvalid} btn btn-default` : `${styles.buttonValid} btn btn-default`} disabled={this.isFormInvalid()}>Submit</button>&nbsp;&nbsp;&nbsp;
                        <Link to='/stores' className={styles.buttonCancel}>Cancel</Link>
                    </div>
                </form>
            </div>
            <div><p>{this.state.message}</p></div>
            <ResultsStoreCategory description='Store' redirect='/stores' data={this.state.data} handleDelete={this.handleDelete} />
            </>
        );
    };
};

export default StorePage;