import React from 'react';
import { NavLink } from 'react-router-dom';

const CustomerSubmenu = (props) => {
  return (
    <div>
      <NavLink to='/add'> Add</NavLink>
      <NavLink to='/edit'> Edit</NavLink>
    </div>
  );
};

export default CustomerSubmenu;
