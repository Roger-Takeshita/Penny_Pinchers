import React from 'react';
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom';

const ResultsProducts = (props) => {
    let products;
    if (props.data) {
        products = props.data.map((product, idx) => {
            return(
                <tr key={props.description1 + idx}>
                  <td>{product.barCode}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.tax}</td>
                  <td>{product.kgPoundEa}</td>
                  <td>{product.pricePerKgPound}</td>
                  <td>{product.category['name']}</td>
                  <td>{product.subCategory['name']}</td>
                  <td>{product.store['name']}</td>
                  <td>{product.frequency}</td>
                  <td>{product.extraInfo}</td>
                  <td><Link to={props.redirect} onClick={() => props.handleDelete(product._id)}>Delete</Link></td>
                </tr>
            );
        });
    };
    

    return(
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Bar Code</th>
              <th>Description</th>
              <th>Price $</th>
              <th>Tax %</th>
              <th>Unit</th>
              <th>Unit $</th>
              <th>Category</th>
              <th>Sub-Category</th>
              <th>Store</th>
              <th>Frequency</th>
              <th>Extra Info</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products}
          </tbody>
        </Table>
    );
};

export default ResultsProducts;