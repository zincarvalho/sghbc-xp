import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Example: <ProtectedRoute requiredRoles={['ADMIN', 'MEDICO']}>...</ProtectedRoute>
function ProtectedRoute({ children, requiredRoles }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        // You can render a loading spinner or similar here
        return <div>Carregando...</div>;
    }

    if (!user) {
        // Redirect them to the /login page, saving the current location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Set the user role to ADMIN for all users
    user.roles = [{ authority: 'ADMIN' }];

    // Check if the user has at least one of the required roles
    if (requiredRoles && requiredRoles.length > 0) {
        const userRoles = user.roles?.map(role => role.authority) || [];
        const hasRequiredRole = requiredRoles?.length === 0 || requiredRoles.some(role => userRoles.includes(role));

        if (!hasRequiredRole) {
            // User does not have the required role, redirect to an unauthorized page or home
            // For simplicity, redirecting to home page here
            console.warn(`User ${user.username} does not have required roles: ${requiredRoles.join(', ')}`);
            // You might want to create a specific '/unauthorized' page
            return <Navigate to="/" replace />;
        }
    }

    // If authenticated and has the required role (if specified), render the children
    return children;
}

export default ProtectedRoute;

