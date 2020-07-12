import React, { Component } from 'react';
import FormField from './form-field';

class LoginUser extends Component {
  state = {
    user: {
      username: '',
      password: '',
    },
  };

  render() {
    return (
      <div className='login-user'>
        <h1>Login </h1>
        <hr />
        <div className='jumbotron'>
          <form onSubmit={this.handleSubmit}>
            <FormField
              id='username'
              name='username'
              label='username'
              type='email'
              placeholder='Enter username'
              onChange={this.handleChange}
            />
            <FormField
              id='password'
              name='password'
              label='Password'
              type='password'
              placeholder='Enter password.'
              onChange={this.handleChange}
            />

            <button className='btn btn-primary' type='submit'>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.user);
    this.postDataToApi(this.state.user);
  };
  postDataToApi = async (data) => {
    try {
      // Create request to api service
      const req = await fetch('http://www.fulek.com/nks/api/aw/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        // format the data
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const res = await req.json();
      if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', res.username);
        window.open('http://localhost:3001/customers', '_self');
      }
      // Log success message
      console.log(res);
    } catch (err) {
      console.error(`ERROR: ${err}`);
      alert('Wrong password or user name!');
    }
  };
  handleChange = async ({ currentTarget: input }) => {
    const user = { ...this.state.user };
    user[input.name] = input.value;
    this.setState({ user });
  };
}

export default LoginUser;
