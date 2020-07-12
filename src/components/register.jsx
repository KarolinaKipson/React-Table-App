import React, { Component } from 'react';
import FormField from './form-field';
import {
  validateFormYup,
  getPropertyValidationErrorYup,
} from '../utils/validationYupCustomer';

class RegisterUser extends Component {
  state = {
    user: {
      username: '',
      password: '',
      email: '',
    },
    errors: {},
  };
  render() {
    const { errors } = this.state;

    return (
      <div className='add-user'>
        <h1>Register as new user</h1>
        <hr />
        <div className='jumbotron'>
          <form onSubmit={this.handleSubmit}>
            <FormField
              id='username'
              name='username'
              label='username'
              type='email'
              placeholder='Enter username'
              error={errors.username}
              onChange={this.handleChange}
            />
            <FormField
              id='password'
              name='password'
              label='Password'
              type='password'
              placeholder='Enter password.'
              error={errors.password}
              onChange={this.handleChange}
            />
            <FormField
              id='name'
              name='name'
              label='Name'
              type='text'
              placeholder='Enter name.'
              error={errors.name}
              onChange={this.handleChange}
            />

            <button className='btn btn-primary' type='submit'>
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = await validateFormYup(this.state.user);
    // never null or undefined for set state (validateFormYup can return null if object is empty)
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
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
    const user = { ...this.state.user };
    this.setState({ user, errors });
  };
}

export default RegisterUser;
