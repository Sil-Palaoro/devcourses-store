import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api.js";
import { UserRole } from "@devcourses/domain";
import { tokenDecoder } from "../utils/jwt-decoder.js";

type AuthContextType = {
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

    useEffect(() => {
        const init = async () => {
            if (token) {
                try {
                    //TODO: Probar si funciona de esta forma
                    const decodedUserRole = tokenDecoder(token)
                    // const me = await api.get<UserRole>("/:id");
                    // setUserRole(me);
                    setUserRole(decodedUserRole);
                    localStorage.setItem("dc_userRole", JSON.stringify(decodedUserRole));
                } catch (err) {
                    console.warn("Token inválido o expirado, logout automático");
                    setToken(null);
                    setUserRole(null);
                    localStorage.removeItem("dc_token");
                    localStorage.removeItem("dc_userRole");                   
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
        } finally {
            setLoading(false);
        };
    };

    const logout = () => {
        setToken(null);
        setUserRole(null);
        localStorage.removeItem("dc_token");
        localStorage.removeItem("dc_userRole");
    };

    const value: AuthContextType = {
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