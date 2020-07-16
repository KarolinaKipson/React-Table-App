import React, { Component } from 'react';
import FormField from './form-field';
import {
  validateFormYup,
  getPropertyValidationErrorYup,
} from '../utils/validationYupUser';
import DropDown from './drop-down';

class AddBill extends Component {
  state = {
    bill: {
      date: '',
      billNumber: '',
      comment: '',
    },
    sellers: [],
    sellerId: '',
    creditcard: {
      id: '',
      type: '',
      cardNumber: '',
      expirationMonth: '',
      expirationYear: '',
    },
    customers: [],
    customerId: this.props.match.params.id,
    errors: {},
  };
  render() {
    const { errors } = this.state;
    return (
      <div className='add-user'>
        <h1>Add Bill</h1>
        <hr />
        <div className='jumbotron'>
          <form onSubmit={this.handleSubmit}>
            <FormField
              id='date'
              name='date'
              label='Date'
              type='date'
              placeholder='Enter Bill Date.'
              error={errors.date}
              onChange={this.handleChange}
            />
            <FormField
              id='billNumber'
              name='billNumber'
              label='Bill No'
              type='text'
              placeholder='Enter Bill Number.'
              error={errors.billNumber}
              onChange={this.handleChange}
            />
            <FormField
              id='comment'
              name='comment'
              label='Comment'
              type='text'
              placeholder='Enter comment.'
              error={errors.comment}
              onChange={this.handleChange}
            />
            <DropDown
              options={this.state.sellers}
              id='sellers'
              name='sellers'
              label='Seller'
              optionText='Surname'
              optionValue='Id'
              onChange={(e) => this.handleDropdownChangeSeller(e)}
            />
            <FormField
              id='type'
              name='type'
              label='Type'
              type='text'
              placeholder='Enter type.'
              error={errors.type}
              onChange={this.handleChange}
            />
            <FormField
              id='cardNumber'
              name='cardNumber'
              label='Card Number'
              type='number'
              placeholder='Enter card number.'
              error={errors.cardNumber}
              onChange={this.handleChange}
            />
            <FormField
              id='expirationMonth'
              name='expirationMonth'
              label='Expiration Month'
              type='number'
              placeholder='Enter expiration month.'
              error={errors.expirationMonth}
              onChange={this.handleChange}
            />
            <FormField
              id='expirationYear'
              name='expirationYear'
              label='Expiration Year'
              type='number'
              placeholder='Enter Expiration Year.'
              error={errors.expirationYear}
              onChange={this.handleChange}
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
    this.getSellers();
  }
  getSellers = async () => {
    let responseSellers = await fetch(
      'http://www.fulek.com/nks/api/aw/sellers'
    );
    const sellersJson = await responseSellers.json();
    this.setState({ sellers: sellersJson });
  };
  handleDropdownChangeSeller(e) {
    // const categoryId = { ...this.state.categoryId };

    this.setState({ sellerId: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    //const errors = await validateFormYup(this.state.user);

    // never null or undefined for set state (validateFormYup can return null if object is empty)
    //this.setState({ errors: errors || {} });

    // if (errors) {
    //   return;
    // }

    this.dataApi();
  };
  dataApi = async () => {
    let response = await this.postDataToApiCreditCard(this.state.creditcard);
    console.log(response);
    const res = await this.postDataToApi(
      this.state.bill,
      this.state.customerId,
      this.state.sellerId,
      +response
    );
    //console.log(res);
  };
  postDataToApi = async (bill, customerId, sellerId, creditCardId) => {
    try {
      // Create request to api service
      const token = localStorage.getItem('token');
      const req = await fetch('http://www.fulek.com/nks/api/aw/addbill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        // format the data
        body: JSON.stringify({
          Date: bill.date,
          BillNumber: bill.billNumber,
          CustomerId: customerId,
          SellerId: sellerId,
          CreditCardId: creditCardId,
          Comment: bill.comment,
        }),
      });
      const res = await req.json();
      console.log(res);
      return res;
      // Log success message
    } catch (err) {
      console.error(`ERROR: ${err}`);
      alert('Can not add new bill!');
    }
  };

  postDataToApiCreditCard = async (creditcard) => {
    try {
      // Create request to api service
      const token = localStorage.getItem('token');
      const req = await fetch('http://www.fulek.com/nks/api/aw/addcreditcard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        // format the data
        body: JSON.stringify({
          Type: creditcard.type,
          CardNumber: creditcard.cardNumber,
          ExpirationMonth: creditcard.expirationMonth,
          ExpirationYear: creditcard.expirationYear,
        }),
      });
      const res = await req.json();
      //console.log(res);
      this.setState({ creditcard: res });
      return res.Id;
      // console.log('creditcard is ' + creditcard.Id);
      // Log success message
    } catch (err) {
      console.error(`ERROR: ${err}`);
      //alert('CreditCardAdded!');
    }
  };
  handleChange = async ({ currentTarget: input }) => {
    // const errors = { ...this.state.errors };
    // const errorMessage = await getPropertyValidationErrorYup(input);
    // if (errorMessage) {
    //   errors[input.name] = errorMessage.message;
    // } else {
    //   delete errors[input.name];
    // }
    const bill = { ...this.state.bill };
    bill[input.name] = input.value;
    const creditcard = { ...this.state.creditcard };
    creditcard[input.name] = input.value;
    this.setState({ bill, creditcard });
  };
}

export default AddBill;
