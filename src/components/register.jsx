import React, { Component } from 'react';
import FormField from './form-field';
import {
  validateFormYup,
  getPropertyValidationErrorYup,
} from '../utils/validationYupUser';

class RegisterUser extends Component {
  state = {
    user: {
      username: '',
      password: '',
      name: '',
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
    this.postDataToApi(this.state.user);
  };
  postDataToApi = async (data) => {
    try {
      // Create request to api service
      const req = await fetch('http://www.fulek.com/nks/api/aw/registeruser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        // format the data
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          name: data.name,
        }),
      });
      const res = await req.json();
      console.log(res);
      if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', res.username);
        window.open('http://localhost:3001/customers', '_self');
      }
      // Log success message
    } catch (err) {
      console.error(`ERROR: ${err}`);
      alert('Can not register new user!');
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
    user[input.name] = input.value;
    this.setState({ user, errors });
  };
}

export default RegisterUser;
