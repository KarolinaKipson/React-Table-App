import React, { Component } from 'react';
import ItemsTable from './items-table';
import Pagination from './pagination';
import _ from 'lodash';

class Items extends Component {
  state = {
    // never null or undefined, empty type you want to define
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
    const items = this.state.items.filter((c) => c.Id !== itemId);
    this.setState({ items });
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
        'http://www.fulek.com/nks/api/aw/billitems/50744'
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
}

export default Items;
