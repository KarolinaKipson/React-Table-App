import React, { Component } from 'react';
import FormField from './form-field';

import DropDown from './drop-down';
import { Link } from 'react-router-dom';

class CustomerDetail extends Component {
  state = {
    CustomerId: this.props.match.params.id,
    Name: '',
    Surname: '',
    Email: '',
    Telephone: '',
    CityId: '',
    cities: [],
  };

  render() {
    return (
      <div className='customerDetail'>
        <h1>
          <span className='badge badge-danger'>
            Customer id:{' '}
            <span className='badge badge-dark'>{this.state.CustomerId}</span>
          </span>
        </h1>
        <hr />
        <div className='jumbotron'>
          <form onSubmit={this.handleSubmit}>
            <FormField
              id='Name'
              name='Name'
              label='Name'
              type='text'
              value={this.state.Name}
              onChange={this.handleChange.bind(this)}
            />
            <FormField
              id='surname'
              name='surname'
              label='Surname'
              type='text'
              value={this.state.Surname}
              onChange={this.handleChange.bind(this)}
            />
            <FormField
              id='email'
              name='email'
              label='Email'
              type='email'
              value={this.state.Email}
              onChange={this.handleChange.bind(this)}
            />
            <FormField
              id='telephone'
              name='telephone'
              label='Telephone'
              type='tel'
              value={this.state.Telephone}
              onChange={this.handleChange.bind(this)}
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
  componentWillMount() {
    this.getData();
    this.getCities();
  }
  componentDidMount() {
    //this.getCities();
    //this.getData();
    //this.setState(this.state);
  }

  getData = async () => {
    let responseCustomer = await fetch(
      'http://www.fulek.com/nks/api/aw/customer/' + this.state.CustomerId
    );
    const customerJson = await responseCustomer.json();
    console.log(customerJson);

    this.setState({
      Name: customerJson.Name,
      CustomerId: customerJson.Id,
      Surname: customerJson.Surname,
      Email: customerJson.Email,
      Telephone: customerJson.Telephone,
      CityId: customerJson.CityId,
    });
  };
  getCities = async () => {
    let responseCities = await fetch('http://www.fulek.com/nks/api/aw/cities');
    const citiesJson = await responseCities.json();
    this.setState({ cities: citiesJson });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    this.editCustomer(this.state.Name, this.state.CustomerId);
  };
  async editCustomer(name, customerId, surname, email, telephone, cityId) {
    try {
      const token = localStorage.getItem('token');
      let reqCustomers = await fetch(
        'http://www.fulek.com/nks/api/aw/editcustomer',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'POST',
          body: JSON.stringify({
            Id: +customerId,
            Name: name,
            Surname: surname,
            Email: email,
            Telephone: telephone,
            CityId: +cityId,
          }),
        }
      );
      let jsonEdit = await reqCustomers.json();
      console.log(jsonEdit);
      this.setState({
        Name: jsonEdit.Name,
        CustomerId: jsonEdit.Id,
        Surname: jsonEdit.Surname,
        Email: jsonEdit.Email,
        Telephone: jsonEdit.Telephone,
        CityId: jsonEdit.CityId,
      });
      alert('Customer ' + this.state.CustomerId + ' edited.');
      window.open('http://localhost:3001/customers', '_self');
    } catch (error) {
      console.error(error);
    }
  }
  handleDropdownChange(e) {
    // const categoryId = { ...this.state.categoryId };

    this.setState({ cityId: e.target.value });
  }
  // handleChange(e) {
  //   this.setState({
  //     [e.target.name]: e.target.defaultValue,
  //   });
  // }
  handleChange(e) {
    const target = e.target.value;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
}

export default CustomerDetail;
