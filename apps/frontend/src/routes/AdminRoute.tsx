import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const AdminRoute: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();
    if(loading) return <div>Loading...</div>;
    if(!isAuthenticated) return <Navigate to="/" replace />
    return isAdmin? children: <Navigate to="/" replace />; 
};