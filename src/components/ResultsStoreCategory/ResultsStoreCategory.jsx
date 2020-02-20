import React from 'react';
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom';

const ResultsStoreCategory = (props) => {
    let list;
    if (props.data) {
        list = props.data.map((item, idx) => {
            return(
                <tr key={props.description1 + idx}>
                    <td>{item.name}</td>
                    <td><Link to={props.redirect} onClick={() => props.handleDelete(item._id)}>Delete</Link></td>
                </tr>
            );
        });
    };

    return(
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>{props.description2}{props.data ? ` (${props.data.length})` : ''}</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </Table>
    );
};

export default ResultsStoreCategory;