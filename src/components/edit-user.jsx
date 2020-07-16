import React, { Component } from 'react';
import FormField from './form-field';
import {
  validateFormYup,
  getPropertyValidationErrorYup,
} from '../utils/validationYupUser';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: '',
      password: '',
      name: '',
      img: '',

      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    this.getUser(localStorage.getItem('user'));
  }
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
      console.log(res.id);
      this.setState({
        id: res.id,
        username: res.username,
        password: res.password,
        name: res.name,
        img: res.img,
      });
      // Log success message
    } catch (err) {
      console.error(`ERROR: ${err}`);
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className='add-user'>
        <h1>Edit User</h1>
        <hr />
        <div className='jumbotron'>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <FormField
              id='username'
              name='username'
              label='Username'
              type='text'
              defaultValue={this.state.username}
              error={errors.username}
              onChange={this.handleChange}
            />
            <FormField
              id='password'
              name='password'
              label='Password'
              type='password'
              defaultValue={this.state.password}
              error={errors.password}
              onChange={this.handleChange}
            />
            <FormField
              id='name'
              name='name'
              label='Name'
              type='text'
              defaultValue={this.state.name}
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
  handleChange(e) {
    const target = e.target.value;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
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
