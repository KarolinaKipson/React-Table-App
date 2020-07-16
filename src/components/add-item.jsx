import React, { Component } from 'react';
import FormField from './form-field';
import DropDown from './drop-down';

import {
  validateFormYup,
  getPropertyValidationErrorYup,
} from '../utils/validationYupUser';

class AddItem extends Component {
  state = {
    item: {
      billId: this.props.match.params.id,
      quantity: '',
    },
    products: [],
    productId: '',
    categories: [],
    categoryId: '',
    subcategories: [],
    subcategoryId: '',
    errors: {},
  };

  render() {
    const { errors } = this.state;
    return (
      <div className='add-item'>
        <h1>Add Item to Bill</h1>
        <hr />
        <div className='jumbotron'>
          <form onSubmit={this.handleSubmit}>
            <FormField
              id='billId'
              name='billId'
              label='Bill No'
              type='text'
              readonly
              value={this.state.item.billId}
            />
            <FormField
              id='quantity'
              name='quantity'
              label='Quantity'
              type='number'
              placeholder='Enter quantity.'
              error={errors.quantity}
              onChange={this.handleChange}
            />
            <DropDown
              options={this.state.categories}
              id='categories'
              name='categories'
              label='Categories'
              optionText='Name'
              optionValue='Id'
              onChange={(e) => this.handleDropdownChange(e)}
            />
            <DropDown
              options={this.state.subcategories}
              id='subcategories'
              name='subcategories'
              label='Subategories'
              optionText='Name'
              optionValue='Id'
              onChange={(e) => this.handleDropdownChangeSubcategory(e)}
            />
            <DropDown
              options={this.state.products}
              id='products'
              name='products'
              label='Product'
              optionText='Name'
              optionValue='Id'
              onChange={(e) => this.handleDropdownChangeProduct(e)}
            />
            <button className='btn btn-primary' type='submit'>
              Add
            </button>
          </form>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.getAllCategories();
  }
  componentDidUpdate() {
    this.getAllSubcategories();
    this.getAllProducts();
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    //const errors = await validateFormYup(this.state.user);

    // never null or undefined for set state (validateFormYup can return null if object is empty)
    //this.setState({ errors: errors || {} });

    //if (errors) {
    //  return;
    //}
    this.postDataToApi(
      this.state.item.billId,
      this.state.productId,
      this.state.item.quantity
    );
  };
  getAllCategories = async () => {
    let responseCategories = await fetch(
      'http://www.fulek.com/nks/api/aw/categories'
    );
    const categoriesJson = await responseCategories.json();
    this.setState({ categories: categoriesJson });
  };

  getAllSubcategories = async () => {
    let responseSubcategories = await fetch(
      'http://www.fulek.com/nks/api/aw/subcategories/' + this.state.categoryId
    );
    const subcategoriesJson = await responseSubcategories.json();
    this.setState({ subcategories: subcategoriesJson });
  };

  getAllProducts = async () => {
    let responseProducts = await fetch(
      'http://www.fulek.com/nks/api/aw/products/' + this.state.subcategoryId
    );
    const productsJson = await responseProducts.json();
    this.setState({ products: productsJson });
  };
  postDataToApi = async (billId, productId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      // Create request to api service
      const req = await fetch('http://www.fulek.com/nks/api/aw/additem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        // format the data
        body: JSON.stringify({
          BillId: billId,
          ProductId: productId,
          Quantity: quantity,
        }),
      });
      const res = await req.json();
      console.log(res);

      window.open(
        'http://localhost:3001/items/' + this.state.item.billId,
        '_self'
      );
      alert('Item succesfully added');
      // Log success message
    } catch (err) {
      console.error(`ERROR: ${err}`);
      alert('Can not add new item!');
    }
  };
  handleDropdownChange(e) {
    // const categoryId = { ...this.state.categoryId };

    this.setState({ categoryId: e.target.value });
  }
  handleDropdownChangeSubcategory(e) {
    // const categoryId = { ...this.state.categoryId };
    this.setState({ subcategoryId: e.target.value });
  }
  handleDropdownChangeProduct(e) {
    // const categoryId = { ...this.state.categoryId };

    this.setState({ productId: e.target.value });
  }
  handleChange = async ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = await getPropertyValidationErrorYup(input);
    if (errorMessage) {
      errors[input.name] = errorMessage.message;
    } else {
      delete errors[input.name];
    }
    const item = { ...this.state.item };
    item[input.name] = input.value;
    this.setState({ item, errors });
  };
}

export default AddItem;
