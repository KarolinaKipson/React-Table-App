import React, { Component } from 'react';
import FormField from './form-field';

import DropDown from './drop-down';
import { Link } from 'react-router-dom';

class CustomerDetail extends Component {
  state = {
    customerId: this.props.match.params.id,
    customer: [],
    cities: [],
  };

  render() {
    return (
      <div className='customerDetail'>
        <h1>
          <span className='badge badge-danger'>
            Customer id:{' '}
            <span className='badge badge-dark'>{this.state.customerId}</span>
          </span>
        </h1>
        <hr />
        <div className='jumbotron'>
          <form>
            <FormField
              id='Name'
              name='Name'
              label='Name'
              type='text'
              defaultValue={this.state.customer.Name}
              onChange={(e) => this.handleChange(e)}
            />
            <FormField
              id='surname'
              name='surname'
              label='Surname'
              type='text'
              defaultValue={this.state.customer.Surname}
              onChange={(e) => this.handleChange(e)}
            />
            <FormField
              id='email'
              name='email'
              label='Email'
              type='email'
              defaultValue={this.state.customer.Email}
              onChange={(e) => this.handleChange(e)}
            />
            <FormField
              id='telephone'
              name='telephone'
              label='Telephone'
              type='tel'
              defaultValue={this.state.customer.Telephone}
              onChange={(e) => this.handleChange(e)}
            />
            <DropDown
              options={this.state.cities}
              id='cities'
              name='cities'
              label='Cities'
              optionText='Name'
              value='Id'
              onChange={(e) => this.handleDropdownChange(e)}
            />
            <button className='btn btn-primary' type='submit'>
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getCities();
    this.getData();
    //this.setState(this.state);
  }

  componentDidUpdate() {}
  getData = async () => {
    let responseCustomer = await fetch(
      'http://www.fulek.com/nks/api/aw/customer/' + this.state.customerId
    );
    const customerJson = await responseCustomer.json();
    console.log(customerJson);

    this.setState({ customer: customerJson });
  };
  getCities = async () => {
    let responseCities = await fetch('http://www.fulek.com/nks/api/aw/cities');
    const citiesJson = await responseCities.json();
    this.setState({ cities: citiesJson });
  };
  async editCustomer(customer) {
    try {
      const token = localStorage.getItem('token');
      let responseCustomers = await fetch(
        'http://www.fulek.com/nks/api/aw/editcustomer',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'POST',
          body: JSON.stringify({ customer: customer }),
        }
      );
      let jsonEdit = await responseCustomers.json();
      console.log(jsonEdit);
      this.setState({
        customer: jsonEdit,
      });
      alert('Customer ' + customer.Id + ' edited.');
    } catch (error) {
      console.error(error);
    }
  }
  handleDropdownChange(e) {
    // const categoryId = { ...this.state.categoryId };

    this.setState({ cityId: e.target.value });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.defaultValue,
    });
  }
  // handleChange = async ({ currentTarget: input }) => {
  //   /*  const errors = { ...this.state.errors };
  //   const errorMessage = await getPropertyValidationErrorYup(input);
  //   if (errorMessage) {
  //     errors[input.name] = errorMessage.message;
  //   } else {
  //     delete errors[input.name];
  //   } */
  //   const customer = { ...this.state.customer };
  //   customer[input.name] = input.value;
  //   this.setState({ customer });
  // };
}

export default CustomerDetail;
