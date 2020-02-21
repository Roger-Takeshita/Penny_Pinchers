import React from 'react';
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom';

const ResultsProducts = (props) => {
    let products;
    if (props.data) {
        products = props.data.map((product, idx) => {
            return(
                <tr key={props.description1 + idx}>
                  <td className="text-center">{product.barCode}</td>
                  <td>{product.description}</td>
                  <td className="text-center">{product.price ? `$${product.price}` : ''}</td>
                  <td className="text-center">{product.tax ? `${product.tax}%` : ''}</td>
                  <td className="text-center">{product.kgPoundEa}</td>
                  <td className="text-center">{product.pricePerKgPound ? `$${product.pricePerKgPound}` : ''}</td>
                  <td className="text-center">{product.category['name']}</td>
                  <td className="text-center">{product.subCategory['name']}</td>
                  <td className="text-center">{product.store['name']}</td>
                  <td className="text-center">{product.frequency}</td>
                  <td className="text-center">{product.extraInfo}</td>
                  <td className="text-center"><Link to={props.redirect} onClick={() => props.handleDelete(product._id)} className="delete-cancel">Delete</Link></td>
                </tr>
            );
        });
    };
    

    return(
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th className="text-center">Bar Code</th>
              <th className="text-center">Description</th>
              <th className="text-center">$ Price</th>
              <th className="text-center">Tax %</th>
              <th className="text-center">Unit</th>
              <th className="text-center">$ Unit</th>
              <th className="text-center">Category</th>
              <th className="text-center">Sub-Category</th>
              <th className="text-center">Store</th>
              <th className="text-center">Frequency</th>
              <th className="text-center">Extra Info</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products}
          </tbody>
        </Table>
    );
};

export default ResultsProducts;