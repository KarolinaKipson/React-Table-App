import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BillsTable extends Component {
  render() {
    const { bills, allBills, onDelete } = this.props;
    return (
      <div className='container'>
        <Link to={'/addBill'}>
          <h3>
            <span className='badge badge-dark'>Add Bill</span>
          </h3>
        </Link>
        <table className=' table table-striped table-dark'>
          <thead className='thead-light '>
            <tr>
              <th colSpan='7'>
                {allBills.length > 0 ? (
                  <span>Bills: {allBills.length}</span>
                ) : (
                  <span>There are no bills for this customer.</span>
                )}
              </th>
            </tr>
            <tr>
              <th>Bill No</th>
              <th>Date</th>
              <th>Credit Card number</th>
              <th>Expiration Date</th>
              <th>Seller</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bills.map((b) => {
              return (
                <tr key={`tr${b.Id}`}>
                  <td>{b.BillNumber}</td>
                  <td>{b.Date}</td>
                  <td>{b.CreditCard != null ? b.CreditCard.CardNumber : ''}</td>
                  <td>
                    {b.CreditCard != null ? b.CreditCard.ExpirationMonth : ''}
                    {b.CreditCard != null ? '/' : ''}
                    {b.CreditCard != null ? b.CreditCard.ExpirationYear : ''}
                  </td>
                  <td>
                    {b.Seller != null ? b.Seller.Name : ''} {''}
                    {b.Seller != null ? b.Seller.Surname : ''}
                  </td>
                  <td>
                    {' '}
                    <button
                      className='btn btn-danger'
                      onClick={() => onDelete(b.Id)}>
                      Delete Bill
                    </button>{' '}
                    <Link className='btn btn-primary' to={'/items/' + b.Id}>
                      Show Items
                    </Link>
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
export default BillsTable;
