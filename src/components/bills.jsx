import React, { Component } from 'react';
import BillsTable from './bills-table';
import Pagination from './pagination';
import _ from 'lodash';

class Bills extends Component {
  state = {
    // never null or undefined, empty type you want to define
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
        <Pagination
          pageSize={pageSize}
          currentPage={currentPage}
          itemCount={allBills.length}
          onPageChange={this.handlePageChange}
        />
        <BillsTable bills={bills} allBills={allBills}></BillsTable>
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
        'http://www.fulek.com/nks/api/aw/customerbills/101'
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
}

export default Bills;
