import React from 'react';
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom';

const ResultsProductsList = (props) => {
    let products;
    let totalWithoutTax = 0;
    let totalPlusTax = 0;
    let qty = 0;
    if (props.data) {
        products = props.data.products.map((product, idx) => {
            totalWithoutTax += Number(product.price) * Number(product.quantity) - Number(product.discount) + Number(product.extraCharges);
            totalPlusTax += (product.price * product.quantity - Number(product.discount) + Number(product.extraCharges))*(1+Number(product.tax)/100);
            qty += product.quantity;
            return(
                <tr key={props.description1 + idx}>
                    <td>{product.product.barCode}</td>
                    <td>{product.product.description}</td>
                    <td>{product.product.kgPoundEa}</td>
                    <td>{product.product.pricePerKgPound}</td>
                    <td>{product.extraCharges}</td>
                    <td>{product.discount}</td>
                    <td>{product.tax}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{(product.price * product.quantity - Number(product.discount) + Number(product.extraCharges)).toFixed(2)}</td>
                    <td>{((product.price * product.quantity - Number(product.discount) + Number(product.extraCharges))*(1+Number(product.tax)/100)).toFixed(2)}</td>
                    <td>{product.extraInfo}</td>
                    <td>{product.product.store['name']}</td>
                    <td>{product.product.category['name']}</td>
                    <td>{product.product.subCategory['name']}</td>
                    <td>{product.product.frequency}</td>
                    <td><Link to={props.redirect} onClick={() => props.handleDeleteItem(props.data._id, product._id)}>Delete</Link></td>
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
                    <th>Unit</th>
                    <th>Unit $</th>
                    <th>Extra Charges $</th>
                    <th>Discount $</th>
                    <th>Tax %</th>
                    <th>Price $</th>
                    <th>Qty</th>
                    <th>Total $</th>
                    <th>Total $ + Tax</th>
                    <th>Extra Info</th>
                    <th>Store</th>
                    <th>Category</th>
                    <th>Sub-Category</th>
                    <th>Frequency</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {products}
                <tr>
                    <td><strong>Total</strong></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><strong>{qty}</strong></td>
                    <td><strong>{(totalWithoutTax).toFixed(2)}</strong></td>
                    <td><strong>{(totalPlusTax).toFixed(2)}</strong></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </Table>
    );
};

export default ResultsProductsList;