import React, { Component } from 'react';
import { getCustomers } from '../data/aw-service';
import './customer-table';
import CustomerTable from './customer-table';
import Pagination from './pagination';
import _ from 'lodash';
import DropDown from './drop-down';

class Customers extends Component {
  state = {
    // never null or undefined, empty type you want to define
    customers: this.props.customers,
    possiblePageSize: this.props.possiblePageSize,
    cities: this.props.cities,
    states: this.props.states,
    currentPage: this.props.currentPage,
    pageSize: this.props.pageSize,
  };

  render() {
    const {
      customers: allCustomers,
      possiblePageSize,
      currentPage,
      pageSize,
      cities,
      states,
    } = this.state;
    const startIndex = (currentPage - 1) * pageSize;
    const customers = _(allCustomers).slice(startIndex).take(pageSize).value();
    return (
      <div>
        <DropDown
          options={possiblePageSize}
          id='possiblePageSize'
          name='possiblePageSize'
          label='Customers on a page'
          optionText='value'
          optionValue='value'
          onChange={(e) => this.handleDropdownChange(e)}
        />
        <h1>
          <span className='badge badge-danger'>Customers</span>
        </h1>
        <Pagination
          pageSize={pageSize}
          currentPage={currentPage}
          itemCount={allCustomers.length}
          onPageChange={this.handlePageChange}
        />
        <CustomerTable
          customers={customers}
          allCustomers={allCustomers}
          cities={cities}
          states={states}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}></CustomerTable>
      </div>
    );
  }
  handleDelete = (customerId) => {
    this.deleteCustomer(customerId);

    // this.setState({ customers });
  };
  handleEdit = (customer) => {
    this.editCustomer(customer);
    //const customers = this.state.customers.filter((c) => c.Id === customerId);
    // this.setState({ customers });
  };
  handlePageChange = (pageNumber) => {
    const currentPage = pageNumber;
    this.setState({ currentPage });
  };
  handleDropdownChange(e) {
    // const categoryId = { ...this.state.categoryId };

    this.setState({ pageSize: +e.target.value });
  }
  componentDidMount() {
    this.getAllData();
  }
  async getAllData() {
    try {
      let responseCustomers = await fetch(
        'http://www.fulek.com/nks/api/aw/customers'
      );
      let jsonCustomers = await responseCustomers.json();
      let responseCities = await fetch(
        'http://www.fulek.com/nks/api/aw/cities'
      );
      let jsonCities = await responseCities.json();
      let responseStates = await fetch(
        'http://www.fulek.com/nks/api/aw/states'
      );
      let jsonStates = await responseStates.json();
      this.setState({
        customers: jsonCustomers,
        cities: jsonCities,
        states: jsonStates,
      });
    } catch (error) {
      console.error(error);
    }
  }
  async deleteCustomer(customerId) {
    try {
      const token = localStorage.getItem('token');
      let responseCustomers = await fetch(
        'http://www.fulek.com/nks/api/aw/deletecustomer',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Token: localStorage.getItem('token'),
          },
          method: 'POST',
          body: JSON.stringify({ Id: customerId }),
        }
      );
      let jsonDelete = await responseCustomers.json();
      console.log(jsonDelete);
      alert('Customer ' + customerId + ' deleted.');
    } catch (error) {
      console.error(error);
      alert('Can not delete customer.');
    }
  }
}

export default Customers;
