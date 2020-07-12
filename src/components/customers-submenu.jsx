import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const CustomerSubmenu = (props) => {
  const history = useHistory();
  const navigateToLogin = () => history.push('/login');
  const navigateToLogout = () => history.push('/customers');
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
      return <button onClick={navigateToLogin}>Login</button>;
    }
  };

  return <div>{authorization()}</div>;
};

export default CustomerSubmenu;
