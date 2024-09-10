import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {

        return <Navigate to="/login" state={{ from: location }} />;
    }

    return element;
};

export default PrivateRoute;

