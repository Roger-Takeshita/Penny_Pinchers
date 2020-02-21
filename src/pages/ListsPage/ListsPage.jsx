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
            this.props.history.push('/lists');
            this.setState({message: '', data})
        } catch (err) {
            this.setState({message: err.message});
        }
    }

    render () {
        console.log(this.state.data)
        if (this.state.dataFlag) {
            let lists = this.state.data.map((list) => {
                let balance = 0;
                let quantity = 0;
                list.products.map((product) => {
                    balance += (product.price*product.quantity - Number(product.discount) + Number(product.extraCharges))*(1+Number(product.tax)/100).toFixed(2);
                    quantity += product.quantity;
                });
                return (
                    <Link to={`/list/${list._id}`} key={list._id}>
                        <Card style={{ width: '20rem' }}>
                            <Card.Header><strong>List:</strong> {list.name}</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item><span className='descrip'>{list.extraInfo}</span></ListGroup.Item>
                                <ListGroup.Item><strong>Number of Items:</strong> <span className='quantity'>{quantity}</span></ListGroup.Item>
                                <ListGroup.Item><strong>Balance:</strong> <span className='balance'>{(balance).toFixed(2)}$</span></ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Link>
                );
            });
            return (
                <div className="container">
                    {lists}
                    {/* <Card style={{ width: '20rem' }}>
                        <Card.Header>Name of the List</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Extra info</ListGroup.Item>
                            <ListGroup.Item>Total Itens: </ListGroup.Item>
                            <ListGroup.Item>Balance</ListGroup.Item>
                        </ListGroup>
                    </Card> */}
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