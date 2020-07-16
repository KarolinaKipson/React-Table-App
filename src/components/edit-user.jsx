import React, { Component } from 'react';
import FormField from './form-field';
import {
  validateFormYup,
  getPropertyValidationErrorYup,
} from '../utils/validationYupUser';

class EditUser extends Component {
  state = {
    user: {
      id: '',
      username: '',
      password: '',
      name: '',
      img: '',
    },
    errors: {},
  };
  render() {
    const { errors } = this.state;
    return (
      <div className='add-user'>
        <h1>Edit User</h1>
        <hr />
        <div className='jumbotron'>
          <form onSubmit={this.handleSubmit}>
            <FormField
              id='username'
              name='username'
              label='Username'
              type='text'
              value={this.state.user.username}
              error={errors.username}
              onChange={this.handleChange}
            />
            <FormField
              id='password'
              name='password'
              label='Password'
              type='password'
              value={this.state.user.password}
              error={errors.password}
              onChange={this.handleChange}
            />
            <FormField
              id='name'
              name='name'
              label='Name'
              type='text'
              value={this.state.user.name}
              error={errors.name}
              onChange={this.handleChange}
            />

            <button className='btn btn-primary' type='submit'>
              Edit
            </button>
          </form>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.getUser(localStorage.getItem('user'));
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
  getUser = async (username) => {
    try {
      const token = localStorage.getItem('token');
      // Create request to api service
      const req = await fetch('http://www.fulek.com/nks/api/aw/getUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        // format the data
        body: JSON.stringify({
          username: username,
        }),
      });
      const res = await req.json();
      // console.log(res);
      this.setState({ user: res });
      // Log success message
    } catch (err) {
      console.error(`ERROR: ${err}`);
    }
  };
  postDataToApi = async (data) => {
    try {
      const token = localStorage.getItem('token');
      // Create request to api service
      const req = await fetch('http://www.fulek.com/nks/api/aw/editUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        // format the data
        body: JSON.stringify({
          id: data.id,
          username: data.username,
          name: data.name,
          password: data.password,
          img: data.img,
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
      alert('Can not edit user!');
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

export default EditUser;
