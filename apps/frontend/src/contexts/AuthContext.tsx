import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api.js";
import { UserRole } from "@devcourses/domain";
import { tokenDecoder } from "../utils/jwt-decoder.js";

type DecodedToken = {
    userId: string;
    role: UserRole;
}

type AuthContextType = {
    userId: string | null;
    userRole: UserRole | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register?: (payload: any) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth debe ser usado dentro de AuthProvider");
    return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("dc_token"));
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const init = async () => {
            if (token) {
                try {
                    const decoded: DecodedToken = tokenDecoder(token)
                    setUserId(decoded.userId);
                    setUserRole(decoded.role);
                    localStorage.setItem("dc_userRole", JSON.stringify(decoded.role));
                    localStorage.setItem("dc_userId", JSON.stringify(decoded.userId))
                } catch (err) {
                    console.warn("Token inválido o expirado, logout automático");
                    setToken(null);
                    setUserRole(null);
                    setUserId(null);
                    localStorage.removeItem("dc_token");
                    localStorage.removeItem("dc_userRole");                   
                    localStorage.removeItem("dc_userId"); 
                }
            }
            setLoading(false);
        };
        init();
    }, [token]);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const postResponse = await api.post<{ token: string }>("/login", { email, password });
            setToken(postResponse.token);
            localStorage.setItem("dc_token", postResponse.token);
            localStorage.setItem("dc_userRole", JSON.stringify(userRole));
            localStorage.setItem("dc_userId", JSON.stringify(userId));
        } finally {
            setLoading(false);
        };
    };

    const logout = () => {
        setToken(null);
        setUserRole(null);
        setUserId(null);
        localStorage.removeItem("dc_token");
        localStorage.removeItem("dc_userRole");
        localStorage.removeItem("dc_userId");
    };

    const value: AuthContextType = {
        userId,
        userRole,
        token, 
        loading,
        login,
        logout,
        isAuthenticated: !!token,
        isAdmin: userRole === "admin",
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}