import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

// Define a type for the component prop
interface ProtectedRouteProps {
    component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();
    console.log(isLoggedIn)
    if (!isLoggedIn) {
        // Redirect to login, save the current location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Render the protected component
    return <Component />;
};

export default ProtectedRoute;
