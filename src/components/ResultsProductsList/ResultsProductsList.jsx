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
                    <td className="text-center">{product.product.barCode}</td>
                    <td>{product.product.description}</td>
                    <td className="text-center">{product.product.kgPoundEa}</td>
                    <td className="text-center">{product.product.pricePerKgPound ? `$${product.product.pricePerKgPound}` : ''}</td>
                    <td className="text-center">{product.extraCharges ? `$${product.extraCharges}` : ''}</td>
                    <td className="text-center">{product.discount? `$${product.discount}` : ''}</td>
                    <td className="text-center">{product.tax ? `${product.tax}%` : ''}</td>
                    <td className="text-center">${product.price}</td>
                    <td className="text-center">{product.quantity}</td>
                    <td className="text-center">${(product.price * product.quantity - Number(product.discount) + Number(product.extraCharges)).toFixed(2)}</td>
                    <td className="text-center">${((product.price * product.quantity - Number(product.discount) + Number(product.extraCharges))*(1+Number(product.tax)/100)).toFixed(2)}</td>
                    <td className="text-center">{product.extraInfo}</td>
                    <td className="text-center">{product.product.store['name']}</td>
                    <td className="text-center">{product.product.category['name']}</td>
                    <td className="text-center">{product.product.subCategory['name']}</td>
                    <td className="text-center">{product.product.frequency}</td>
                    <td className="text-center"><Link to={props.redirect} onClick={() => props.handleDeleteItem(props.data._id, product._id)} className="delete-cancel">Delete</Link></td>
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
                    <th className="text-center">Unit</th>
                    <th className="text-center">Unit $</th>
                    <th className="text-center">Extra Charges $</th>
                    <th className="text-center">Discount $</th>
                    <th className="text-center">Tax %</th>
                    <th className="text-center">Price $</th>
                    <th className="text-center">Qty</th>
                    <th className="text-center">Total $</th>
                    <th className="text-center">Total $ + Tax</th>
                    <th className="text-center">Extra Info</th>
                    <th className="text-center">Store</th>
                    <th className="text-center">Category</th>
                    <th className="text-center">Sub-Category</th>
                    <th className="text-center">Frequency</th>
                    <th className="text-center">Delete</th>
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
                    <td className="text-center"><strong>{qty}</strong></td>
                    <td className="text-center balance"><strong>${(totalWithoutTax).toFixed(2)}</strong></td>
                    <td className="text-center balance"><strong>${(totalPlusTax).toFixed(2)}</strong></td>
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