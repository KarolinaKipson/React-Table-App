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
          optionText={possiblePageSize[1]}
          optionValue={possiblePageSize[1]}
        />
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
    const customers = this.state.customers.filter((c) => c.Id !== customerId);
    this.setState({ customers });
  };
  handleEdit = (customerId) => {
    const customers = this.state.customers.filter((c) => c.Id === customerId);
    this.setState({ customers });
  };
  handlePageChange = (pageNumber) => {
    const currentPage = pageNumber;
    this.setState({ currentPage });
  };

  componentDidMount() {
    this.getAllData();
    /*  fetch('http://www.fulek.com/nks/api/aw/customers')
      .then((response) => response.json())
      .then((customers) => this.setState({ customers }));
    fetch('http://www.fulek.com/nks/api/aw/cities')
      .then((response) => response.json())
      .then((cities) => {
        this.setState({ cities });
       
      });
    fetch('http://www.fulek.com/nks/api/aw/states')
      .then((response) => response.json())
      .then((states) => {
        this.setState({ states });
       
      }); */
    //const customers = getCustomers();
    // this.setState({ customers });
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
}

export default Customers;
