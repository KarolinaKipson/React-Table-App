import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

const startingPoint = (
  // it wraps history object inside a browser and passes it down to component tree
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
ReactDOM.render(startingPoint, document.getElementById('root'));
