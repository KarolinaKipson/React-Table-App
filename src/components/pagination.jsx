import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

class Pagination extends Component {
  render() {
    const { pageSize, itemCount, currentPage, onPageChange } = this.props;
    const pageCount = Math.ceil(itemCount / pageSize);
    const cssClassPrev = currentPage > 1 ? 'page-item' : 'page-item disabled';
    const cssClassNext =
      currentPage >= pageCount ? 'page-item disabled' : 'page-item';
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    return (
      <div>
        <nav>
          <ul className='pagination justify-content-center'>
            <li className={cssClassPrev}>
              <a
                className='page-link'
                onClick={() => onPageChange(currentPage - 1)}
                tabIndex='-1'>
                Previous
              </a>
            </li>
            {pages.map((pageNumber) => (
              <li
                className={
                  currentPage === pageNumber ? 'page-item active' : 'page-item'
                }
                key={`page${pageNumber}`}>
                <a
                  className='page-link'
                  onClick={() => onPageChange(pageNumber)}>
                  {pageNumber}
                </a>
              </li>
            ))}
            <li className={cssClassNext}>
              <a
                className='page-link'
                onClick={() => onPageChange(currentPage + 1)}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
// propTypes are used to make a pre check for variables
Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  itemCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default Pagination;
