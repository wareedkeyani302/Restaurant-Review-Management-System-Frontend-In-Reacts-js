import React, {useState} from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import images from '../../constants/images';
import './Navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
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