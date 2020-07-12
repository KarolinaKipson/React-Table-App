import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const CustomerSubmenu = (props) => {
  const history = useHistory();
  const navigateToLogin = () => history.push('/login');
  const navigateToLogout = () => history.push('/customers');
  const navigateToRegister = () => history.push('/register');
  const logout = () => {
    navigateToLogout();
    localStorage.clear();
  };
  const authorization = () => {
    if (localStorage.getItem('user')) {
      return (
        <div>
          <div>Hello {localStorage.getItem('user')}</div>
          <button onClick={logout}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={navigateToLogin}>Login</button>
          <button onClick={navigateToRegister}>Register</button>
        </div>
      );
    }
  };

  return <div>{authorization()}</div>;
};

export default CustomerSubmenu;
