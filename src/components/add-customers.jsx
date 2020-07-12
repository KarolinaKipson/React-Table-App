import React, { Component } from 'react';
import FormField from './form-field';
import {
  validateFormYup,
  getPropertyValidationErrorYup,
} from '../utils/validationYupCustomer';

class AddCustomer extends Component {
  state = {
    customer: {
      name: '',
      surname: '',
      email: '',
      telephone: '',
    },
    errors: {},
  };
  render() {
    const { errors } = this.state;

    return (
      <div className='add-customer'>
        <h1>Add customer</h1>
        <hr />
        <div className='jumbotron'>
          <form onSubmit={this.handleSubmit}>
            <FormField
              id='name'
              name='name'
              label='Name'
              type='text'
              placeholder='Enter name'
              error={errors.name}
              onChange={this.handleChange}
            />
            <FormField
              id='surname'
              name='surname'
              label='Surname'
              type='text'
              placeholder='Enter surname.'
              error={errors.surname}
              onChange={this.handleChange}
            />
            <FormField
              id='email'
              name='email'
              label='Email'
              type='email'
              placeholder='Enter email.'
              error={errors.email}
              onChange={this.handleChange}
            />
            <FormField
              id='telephone'
              name='telephone'
              label='Telephone'
              type='tel'
              placeholder='Enter telephone number.'
              error={errors.telephone}
              onChange={this.handleChange}
            />
            <button className='btn btn-primary' type='submit'>
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = await validateFormYup(this.state.customer);
    // never null or undefined for set state (validateFormYup can return null if object is empty)
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }
  };
  getPropertyValidation = ({ name, value }) => {
    switch (name) {
      case 'name':
        if (value.trim() === '') return 'Name is required.';
        break;
      case 'surname':
        if (value.trim() === '') return 'Surname is required.';
        break;
      case 'email':
        if (value.trim() === '') return 'Email is required.';
        break;
      case 'telephone':
        if (value.trim() === '') return 'Telephone is required.';
        break;
    }
  };
  handleChange = async ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = await getPropertyValidationErrorYup(input);
    if (errorMessage) {
      errors[input.name] = errorMessage.message;
    } else {
      delete errors[input.name];
    }
    const customer = { ...this.state.customer }; //copy of customer
    customer[input.name] = input.value;
    this.setState({ customer, errors });
  };

  validateForm = () => {
    const errors = {};
    const { customer } = this.state;
    if (customer.name.trim() === '') {
      errors.name = 'Name is required.';
    }
    if (customer.surname.trim() === '') {
      errors.surname = 'Surname is required.';
    }
    if (customer.email.trim() === '') {
      errors.email = 'Email is required.';
    }
    if (customer.telephone.trim() === '') {
      errors.telephone = 'Telephone is required.';
    }
    return Object.keys(errors).length === 0 ? null : errors; // if empty return null and not an empty object
  };
}

export default AddCustomer;
