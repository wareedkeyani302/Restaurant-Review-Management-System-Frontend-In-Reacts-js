import React from 'react';
import { SubHeading } from '../../components';
import { useNavigate } from 'react-router-dom';
import Login from '../Login/Login';

import { images } from '../../constants';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
   navigate('/login')
  }
  const handleLearnmore = () => {
    alert('go to leran more page');
  }
  return (
    <div className="app__header app__wrapper section__padding" id="home">
    <div className="app__wrapper_info">
      <SubHeading title="Chase the new flavour" />
      <h1 className="app__header-h1">The Key To Find best Restaurants</h1>
      <p className="p__opensans" style={{ margin: '2rem 0' }}>Sit tellus lobortis sed senectus vivamus molestie. Condimentum volutpat morbi facilisis quam scelerisque sapien. Et, penatibus aliquam amet tellus </p>
      <div style={{display: 'flex', gap: '10px'}}>
      <button type="button" className="custom__button" style={{borderRadius: '4px'}} onClick={handleLogin} >Login</button>
      <button type='button' className='custom__button' style={{borderRadius: '4px'}} onClick={handleLearnmore}>Learn more</button>
      </div>
    </div>

    <div className="app__wrapper_img">
      <img src={images.welcome} alt="header_img" />
    </div>
  </div>
  )
}

export default Header;