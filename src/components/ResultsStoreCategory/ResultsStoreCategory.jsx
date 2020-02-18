import React from 'react';
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom';

const ResultsStoreCategory = (props) => {
    let storesList;
    if (props.data) {
        storesList = props.data.map((store, idx) => {
            return(
                <tr key={props.description + idx}>
                  <td>{store.name}</td>
                  <td><Link to={props.redirect} onClick={() => props.handleDelete(store._id)}>Delete</Link></td>
                </tr>
            );
        });
    };

    return(
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Stores{props.data ? ` (${props.data.length})` : ''}</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {storesList}
          </tbody>
        </Table>
    );
};

export default ResultsStoreCategory;