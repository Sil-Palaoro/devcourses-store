import React from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { UserRole } from "@devcourses/domain";

type MockAuthProviderProps = {
    userRole?: UserRole | null;
    isAuthenticated?: boolean;
    children: React.ReactNode; 
}

export const MockAuthProvider: React.FC<MockAuthProviderProps> = ({
    userRole = null,
    isAuthenticated = false,
    children,
}) => {
    const value = {
        userRole,
        token: isAuthenticated ? "mock-token" : null,
        loading: false,
        login: async () => {},
        logout: () => {},
        isAuthenticated,
        isAdmin: userRole === "admin",
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};