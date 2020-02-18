import React from 'react';
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom';

const ResultsStore = (props) => {
    let storesList;
    if (props.stores) {
        storesList = props.stores.map((store, idx) => {
            return(
                <tr key={'store-' + idx}>
                  <td>{store.name}</td>
                  <td><Link to="/stores" onClick={() => props.handleDelete(store._id)}>Delete</Link></td>
                </tr>
            );
        });
    };

    return(
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Stores{props.stores ? ` (${props.stores.length})` : ''}</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {storesList}
          </tbody>
        </Table>
    );
};

export default ResultsStore;