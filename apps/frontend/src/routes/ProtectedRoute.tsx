import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";

export const ProtectedRoute: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    if(loading) return <div>Loading...</div>;
    return isAuthenticated? children: <Navigate to="/" replace />; 
};