import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import apiService from '../../utils/apiService';

class ListsPage extends Component {
    state = {
        message: '',
        dataFlag: false,
        data: null
    }

    async componentDidMount() {
        try {
            const data = await apiService.getLists('/api/lists');
            this.setState({
                message: '', 
                dataFlag: true,
                data, 
            });
        } catch (err) {
            console.log(err);
            this.setState({message: err.message, data: null});
        }
    }

    handleDelete = async (id) => {
        try {
            const data = await apiService.deleteList(`/api/deletelist/${id}`)
            this.setState({message: '', data})
            this.props.history.push('/lists');
        } catch (err) {
            this.setState({message: err.message});
        }
    }

    render () {
        if (this.state.dataFlag) {
            let lists = this.state.data.map((list) => {
                let balance = 0;
                let quantity = 0;
                list.products.map((product) => {
                    balance += (product.price*product.quantity - Number(product.discount) + Number(product.extraCharges))*(1+Number(product.tax)/100).toFixed(2);
                    quantity += product.quantity;
                });
                return (
                    <Card border="success" style={{ width: '20rem' }} className="card-sp">
                        <Card.Header>
                            <div className="list-header">
                                <div><img src="/money.png" alt="money" width="30px"/></div>
                                <div><strong>{list.name}</strong></div>
                                <div><Link to="/lists/" onClick={() => this.handleDelete(list._id)} className="delete-cancel"><h4>X</h4></Link></div>
                            </div>
                        </Card.Header>
                        <Link to={`/list/${list._id}`} key={list._id}>
                            <Card.Body>
                                <Card.Title>{list.extraInfo}</Card.Title>
                                <Card.Text>
                                <div className="list-item">
                                    <div><strong>Number of Items:</strong></div>
                                    <div><span className='quantity'>{quantity}</span></div>
                                </div>
                                <div className="list-item">
                                    <div><strong>Balance:</strong></div>
                                    <div><span className='balance'>${(balance).toFixed(2)}</span></div>
                                </div>
                                </Card.Text>
                            </Card.Body>
                        </Link>
                    </Card>
                );
            });
            return (
                <div className="container list-div">
                    {lists}
                </div>
            );
        } else {
            return (
                <div>Loading...</div>
            );
        }
    };
};

export default ListsPage;