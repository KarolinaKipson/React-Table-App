import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CustomerTable extends Component {
  render() {
    const {
      customers,
      allCustomers,
      onDelete,
      cities,
      states,
      onEdit,
    } = this.props;
    return (
      <div className='container'>
        <Link to={'/addCustomer'}>
          <h3>
            <span className='badge badge-dark'>Add Customer</span>
          </h3>
        </Link>
        <table className=' table table-striped table-dark'>
          <thead className='thead-light '>
            <tr>
              <th colSpan='7'>
                {allCustomers.length > 0 ? (
                  <span>Customers in table: {allCustomers.length}</span>
                ) : (
                  <span>There are no customers in a table.</span>
                )}
              </th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Tel</th>
              <th>City</th>
              <th>State</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => {
              return (
                <tr key={`tr${c.Id}`}>
                  {localStorage.getItem('user') ? (
                    <td>
                      <Link to={'/detail/' + c.Id}>{c.Name}</Link>
                    </td>
                  ) : (
                    <td>{c.Name}</td>
                  )}
                  <td>{c.Surname}</td>
                  <td>
                    <a href={`mailto:${c.Email}`}>{c.Email}</a>
                  </td>
                  <td>{c.Telephone}</td>
                  <td>{cities.find((city) => city.Id === c.CityId).Name}</td>
                  <td>
                    {
                      states.find(
                        (state) =>
                          state.Id ===
                          cities.find((city) => city.Id === c.CityId).StateId
                      ).Name
                    }
                  </td>
                  {localStorage.getItem('user') ? (
                    <td>
                      {' '}
                      <button
                        className='btn btn-danger'
                        onClick={() => onDelete(c.Id)}>
                        Delete Customer
                      </button>{' '}
                      <Link className='btn btn-primary' to={`bills/${c.Id}`}>
                        Show Bills
                      </Link>
                    </td>
                  ) : (
                    ''
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default CustomerTable;
