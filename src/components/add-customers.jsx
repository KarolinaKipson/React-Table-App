import React, { Component } from 'react';
import FormField from './form-field';
import {
  validateFormYup,
  getPropertyValidationErrorYup,
} from '../utils/validationYupCustomer';
import DropDown from './drop-down';

class AddCustomer extends Component {
  state = {
    customer: {
      name: '',
      surname: '',
      email: '',
      telephone: '',
    },
    cities: [],
    cityId: '',
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
            <DropDown
              options={this.state.cities}
              id='cities'
              name='cities'
              label='Cities'
              optionText='Name'
              optionValue='Id'
              onChange={(e) => this.handleDropdownChange(e)}
            />
            <button className='btn btn-primary' type='submit'>
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.getAllCities();
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = await validateFormYup(this.state.customer);
    // never null or undefined for set state (validateFormYup can return null if object is empty)
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }
    this.postDataToApi(this.state.customer, this.state.cityId);
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
  handleDropdownChange(e) {
    // const categoryId = { ...this.state.categoryId };

    this.setState({ cityId: e.target.value });
  }
  getAllCities = async () => {
    let responseCities = await fetch('http://www.fulek.com/nks/api/aw/cities');
    const citiesJson = await responseCities.json();
    this.setState({ cities: citiesJson });
  };
  postDataToApi = async (customer, cityId) => {
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
          Name: customer.name,
          Surname: customer.surname,
          Email: customer.email,
          Telephone: customer.telephone,
          CityId: cityId,
        }),
      });
      const res = await req.json();
      console.log(res);

      window.open('http://localhost:3001/customers', '_self');
      alert('Customer succesfully added');
      // Log success message
    } catch (err) {
      console.error(`ERROR: ${err}`);
      alert('Can not register new user!');
    }
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
