import React from 'react';
import './AdminHeader.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../container/Authentication/AuthContext';
import dashboardLogo from '../../assets/dashboardLogo.jpeg';

const AdminHeader = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();

    const handleLogout = () => {
        logout();
       navigate ('/login');
    }
  return (
    <div className='admin-header'>
        <div className='header-logo'>
            <img className='logo' src={dashboardLogo} alt='FeastFusion' />
        </div>
        <ul className='navbar'>
            <li className='nav-items'>
                <Link to='restaurants'>Manage Restaurants</Link>
            </li>
            <li className='nav-items'>
            <Link to='users'>Manage Users</Link>
            </li>
        </ul>
        <div className='admin-logout'>
            <button className='admin-logout-button' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default AdminHeader;