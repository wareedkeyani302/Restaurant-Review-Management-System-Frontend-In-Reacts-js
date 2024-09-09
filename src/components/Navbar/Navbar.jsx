import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { useAuth } from '../../container/Authentication/AuthContext';
import images from '../../constants/images';
import './Navbar.css';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleLogout = () => {
    logout();
    navigate('/login');
  }
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.gericht} alt="app logo" />
      </div>
      <ul className="app__navbar-links">
        <li className="p__opensans"><NavLink to="/">Home</NavLink></li>
        <li className="p__opensans"><NavLink to="/about">About</NavLink></li>
        <li className="p__opensans"><NavLink to="/restaurants">Restaurants</NavLink></li>
        <li className="p__opensans"><NavLink to="/contact">Contact</NavLink></li>
      </ul>
      <button type='submit' className='logout-button' onClick={handleLogout}>Logout</button>
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
            <ul className="app__navbar-smallscreen_links">
              <li><NavLink to="/" onClick={() => setToggleMenu(false)}>Home</NavLink></li>
              <li><NavLink to="/about" onClick={() => setToggleMenu(false)}>About</NavLink></li>
              <li><NavLink to="/restaurants" onClick={() => setToggleMenu(false)}>Restaurants</NavLink></li>
              <li><NavLink to="/contact"onClick={() => setToggleMenu(false)}>Contact</NavLink></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;