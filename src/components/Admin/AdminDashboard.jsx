import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ManageRestaurants from '../Manage/ManageRestaurants';
import ManageMenuItems from '../Manage/ManageMenuItems';
import ManageUsers from '../Manage/ManageUsers';
import './AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <nav className="admin-nav">
                <ul>
                    <li><Link to="restaurants">Manage Restaurants</Link></li>
                    <li><Link to="menu/1">Manage Menu Items</Link></li> 
                    <li><Link to="users">Manage Users</Link></li>
                </ul>
            </nav>
            <div className="admin-content">
                <Routes>
                    <Route path="restaurants" element={<ManageRestaurants />} />
                    <Route path="menu/:restaurantId" element={<ManageMenuItems />} />
                    <Route path="users" element={<ManageUsers />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;

