import React from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { UserRole } from "@devcourses/domain";

type MockAuthProviderProps = {
    userId?: string | null;
    userRole?: UserRole | null;
    isAuthenticated?: boolean;
    children: React.ReactNode; 
}

export const MockAuthProvider: React.FC<MockAuthProviderProps> = ({
    userId= null,
    userRole = null,
    isAuthenticated = false,
    children,
}) => {
    const value = {
        userId,
        userRole,
        token: isAuthenticated ? "mock-token" : null,
        loading: false,
        login: async () => {},
        register: async () => {},
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