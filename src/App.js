import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components';
import { Footer } from './container';
import './App.css';
import Login from './container/Login/Login';
import Home from './container/Home/Home';
import About from './container/About/About';
import Restaurants from './container/AllRestaurants/Restaurants';
import Contact from './container/Contact/Contact';

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/restaurants' element={<Restaurants />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default App;

