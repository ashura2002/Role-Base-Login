import React, { type JSX } from 'react'
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: JSX.Element;
    allowRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowRoles }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // if no token
    if (!token) return <Navigate to={'/'} replace />

    if (allowRoles && !allowRoles.includes(role || "")) {
        return <Navigate to="/" replace />;
    }

    return children

}

export default ProtectedRoute