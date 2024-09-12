import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext';

const PrivateRoute = ({ element, requiredRole }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/restaurants" />;
    }

    return element;
};

export default PrivateRoute;






