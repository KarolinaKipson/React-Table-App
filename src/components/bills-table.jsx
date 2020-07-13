import React, { Component } from 'react';

class BillsTable extends Component {
  render() {
    const { bills, allBills } = this.props;
    return (
      <div className='container'>
        <table className=' table table-striped table-dark'>
          <thead className='thead-light '>
            <tr>
              <th colSpan='5'>
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
