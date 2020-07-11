import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import '../styles/navbar.css';
import CustomerSubmenu from './customers-submenu';

const Navbar = (props) => {
  return (
    <nav className='navbar navbar-dark bg-danger'>
      <div>
        <NavLink to='/' exact>
          Home
        </NavLink>
        <NavLink to='/customers'>Customers</NavLink>
      </div>
      <Route path='/customers' component={CustomerSubmenu}></Route>
    </nav>
  );
};

export default Navbar;
