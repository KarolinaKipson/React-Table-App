import React, { Component } from 'react';
import BillsTable from './bills-table';
import Pagination from './pagination';
import _ from 'lodash';

class Bills extends Component {
  state = {
    customerId: this.props.match.params.id,
    bills: this.props.bills,
    currentPage: this.props.currentPage,
    pageSize: this.props.pageSize,
  };

  render() {
    const { bills: allBills, currentPage, pageSize } = this.state;
    const startIndex = (currentPage - 1) * pageSize;
    const bills = _(allBills).slice(startIndex).take(pageSize).value();
    return (
      <div>
        <h1>
          <span className='badge badge-danger'>Bills</span>
        </h1>
        <Pagination
          pageSize={pageSize}
          currentPage={currentPage}
          itemCount={allBills.length}
          onPageChange={this.handlePageChange}
        />
        <BillsTable
          bills={bills}
          allBills={allBills}
          onDelete={this.handleDelete}></BillsTable>
      </div>
    );
  }

  handlePageChange = (pageNumber) => {
    const currentPage = pageNumber;
    this.setState({ currentPage });
  };

  componentDidMount() {
    this.getAllData();
  }
  async getAllData() {
    try {
      let responseBills = await fetch(
        'http://www.fulek.com/nks/api/aw/customerbills/' + this.state.customerId
      );
      let jsonBills = await responseBills.json();
      console.log(jsonBills);
      this.setState({
        bills: jsonBills,
      });
    } catch (error) {
      console.error(error);
    }
  }
  handleDelete = (billId) => {
    this.deleteBill(billId);
    //const items = this.state.items.filter((c) => c.Id !== itemId);
    // this.setState({ bills });
  };
  async deleteBill(billId) {
    try {
      const token = localStorage.getItem('token');
      // Create request to api service
      const req = await fetch('http://www.fulek.com/nks/api/aw/deleteItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        // format the data
        body: JSON.stringify({
          id: billId,
        }),
      });
      const res = await req.json();
      console.log(res);

      window.open(
        'http://localhost:3001/bills/' + this.state.item.customerId,
        '_self'
      );
      alert('Bill succesfully deleted');
      // Log success message
    } catch (err) {
      console.error(`ERROR: ${err}`);
      alert('Can not delete a bill!');
    }
  }
}

export default Bills;
