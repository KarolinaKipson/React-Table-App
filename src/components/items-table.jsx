import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ItemsTable extends Component {
  render() {
    const { items, allItems, onDelete } = this.props;
    return (
      <div className='container'>
        <Link to={`/addItem/${items.map((item) => item.BillId)[0]}`}>
          <h3>
            <span className='badge badge-dark'>Add Item</span>
          </h3>
        </Link>
        <table className=' table table-striped table-dark'>
          <thead className='thead-light '>
            <tr>
              <th colSpan='7'>
                {allItems.length > 0 ? (
                  <span>Items: {allItems.length}</span>
                ) : (
                  <span>There are no items for this bill.</span>
                )}
              </th>
            </tr>
            <tr>
              <th>Product Name</th>
              <th>Product Number</th>
              <th>Color</th>
              <th>Quantity</th>
              <th>Price Per Piece</th>
              <th>Total </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              return (
                <tr key={`tr${item.Id}`}>
                  <td>{item.Product.Name}</td>
                  <td>{item.Product.ProductNumber}</td>
                  <td>
                    {item.Product.Color != null ? item.Product.Color : ''}
                  </td>
                  <td>{item.Quantity}</td>
                  <td>{item.PricePerPiece}</td>
                  <td>{item.TotalPrice}</td>
                  <td>
                    {' '}
                    <button
                      className='btn btn-danger'
                      onClick={() => onDelete(item.Id)}>
                      Delete
                    </button>{' '}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ItemsTable;
