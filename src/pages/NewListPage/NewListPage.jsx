import React, { Component } from 'react';
import { Form, Button }from 'react-bootstrap'
import apiService from '../../utils/apiService';

class NewListPage extends Component {
    state = {
        name: '',
        extraInfo: '',
        message: ''
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
            const id = await apiService.newList({listObj: {name: this.state.name, extraInfo: this.state.extraInfo}}, 'api/newlist');
            this.setState({name: ''})
            this.props.history.push(`/list/${id}`);
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
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="nameForm" onChange={this.handleChange}>
                        <Form.Label>New List</Form.Label>
                        <Form.Control placeholder="Name" name="name" />
                    </Form.Group>

                    <Form.Group controlId="extraInfoForm">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" name="extraInfo" onChange={this.handleChange}/>
                        <Form.Text className="text-muted">(Optional)</Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
                <div><p>{this.state.message}</p></div>
            </>
        );
    };
};

export default NewListPage;