import React, { Component } from 'react';

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

    let buttonShow;

    if (localStorage.getItem('user')) {
      buttonShow = (
        <td>
          {' '}
          <button
            className='btn btn-danger'
            onClick={() => onDelete(customers.map((c) => c.Id))}>
            Delete
          </button>{' '}
          <button
            className='btn btn-primary'
            onClick={() => onEdit(customers.map((c) => c.Id))}>
            Edit
          </button>
        </td>
      );
    } else {
      buttonShow = '';
    }
    return (
      <div className='container'>
        <table className=' table table-striped table-dark'>
          <thead className='thead-light '>
            <tr>
              <th colSpan='5'>
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
                  <td>{c.Name}</td>
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
                  {buttonShow}
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
