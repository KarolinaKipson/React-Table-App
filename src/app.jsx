//rcc

import React, { Component } from 'react';
import Customers from './components/customers';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './components/home-page';
import Navbar from './components/navbar';
import CustomerDetail from './components/customer-detail';
import ShowParams from './components/show-params';
import NotFound from './components/not-found';
import ProgramaticNavigation from './components/programatic-navigation';
import AddCustomer from './components/add-customers';
import LoginUser from './components/login';
import RegisterUser from './components/register';
import Bills from './components/bills';
import Items from './components/items';
import AddBill from './components/add-bill';
import AddItem from './components/add-item';
import EditUser from './components/edit-user';

class App extends Component {
  state = {
    // never null or undefined, empty type you want to define
    customers: [],
    currentPage: 1,
    pageSize: 10,
    bills: [],
    items: [],
    possiblePageSize: [5, 10, 20, 50],
  };
  render() {
    const {
      customers,
      currentPage,
      pageSize,
      possiblePageSize,
      bills,
      items,
    } = this.state;

    return (
      <React.Fragment>
        <Navbar />
        <div className='container' style={{ marginTop: '1em' }}>
          {/* <Switch> to use exact routes, renders first match and not all matches*/}
          <Switch>
            <Route
              path='/customers'
              render={(props) => (
                <Customers
                  {...props}
                  customers={customers}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  possiblePageSize={possiblePageSize}
                />
              )}
            />

            <Route
              path='/bills/:id'
              render={(props) => (
                <Bills
                  {...props}
                  bills={bills}
                  currentPage={currentPage}
                  pageSize={pageSize}
                />
              )}
            />
            <Route
              path='/items/:id'
              render={(props) => (
                <Items
                  {...props}
                  items={items}
                  currentPage={currentPage}
                  pageSize={pageSize}
                />
              )}
            />
            <Route path='/not-found' component={NotFound} />
            <Route path='/login' component={LoginUser} />
            <Route path='/register' component={RegisterUser} />
            <Route path='/' component={HomePage} exact />
            <Route path='/detail/:id' component={CustomerDetail} />
            <Route path='/addCustomer' component={AddCustomer} />
            <Route path='/addBill' component={AddBill} />
            <Route path='/addItem/:id' component={AddItem} />
            <Route path='/editUser' component={EditUser} />
            <Route path='/params' component={ShowParams} />
            <Route path='/navigation' component={ProgramaticNavigation} />

            <Redirect to='/not-found' />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
