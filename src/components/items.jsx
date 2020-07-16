import React, { Component } from 'react';
import ItemsTable from './items-table';
import Pagination from './pagination';
import _ from 'lodash';

class Items extends Component {
  state = {
    billId: this.props.match.params.id,
    items: this.props.items,
    currentPage: this.props.currentPage,
    pageSize: this.props.pageSize,
  };

  render() {
    const { items: allItems, currentPage, pageSize } = this.state;
    const startIndex = (currentPage - 1) * pageSize;
    const items = _(allItems).slice(startIndex).take(pageSize).value();
    return (
      <div>
        <h1>
          <span className='badge badge-danger'>Bill items</span>
        </h1>
        <Pagination
          pageSize={pageSize}
          currentPage={currentPage}
          itemCount={allItems.length}
          onPageChange={this.handlePageChange}
        />
        <ItemsTable
          items={items}
          allItems={allItems}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}></ItemsTable>
      </div>
    );
  }
  handleDelete = (itemId) => {
    this.deleteItem(itemId);
    //const items = this.state.items.filter((c) => c.Id !== itemId);
    //this.setState({ items });
  };
  handleEdit = (itemId) => {
    const items = this.state.items.filter((c) => c.Id === itemId);
    this.setState({ items });
  };
  handlePageChange = (pageNumber) => {
    const currentPage = pageNumber;
    this.setState({ currentPage });
  };

  componentDidMount() {
    this.getAllData();
  }
  async getAllData() {
    try {
      let responseItems = await fetch(
        'http://www.fulek.com/nks/api/aw/billitems/' + this.state.billId
      );
      let jsonItems = await responseItems.json();
      console.log(jsonItems);
      this.setState({
        items: jsonItems,
      });
    } catch (error) {
      console.error(error);
    }
  }
  async deleteItem(itemId) {
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
          id: itemId,
        }),
      });
      const res = await req.json();
      console.log(res);
      window.location.reload(true);
      alert('Item succesfully deleted');
      // Log success message
    } catch (err) {
      console.error(`ERROR: ${err}`);
      alert('Can not delete an item!');
    }
  }
}

export default Items;
