import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import App from './App';
import { AuthProvider } from './container/Authentication/AuthContext';

ReactDOM.render(
  <AuthProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);
