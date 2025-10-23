import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { User } from "@devcourses/domain";

type AuthContextType = {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register?: (payload: any) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if(!ctx) return new Error("useAuth debe ser usado dentro de AuthProvider");
    return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("dc_token"));
    const [user, setUser] = useState<User | null>(() => {
        const raw = localStorage.getItem("dc_user");
        return raw ? JSON.parse(raw) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            if (token) {
                try {
                    const me = await api.get<User>("/:id");
                    setUser(me);
                    localStorage.setItem("dc_user", JSON.stringify(me));
                } catch (err) {
                    console.warn("Token inválido o expirado, logout automático");
                    setToken(null);
                    setUser(null);
                    localStorage.removeItem("dc_token");
                    localStorage.removeItem("dc_user");                   
                }
            }
            setLoading(false);
        };
        init();
    }, [token]);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const resp = await api.post<{ token: string; user: User }>("/login", { email, password });
            setToken(resp.token);
            setUser(resp.user);
            localStorage.setitem("dc_token", resp.token);
            localStorage.setItem("dc_user", JSON.stringify(resp.user));
        } finally {
            setLoading(false);
        };
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("dc_token");
        localStorage.removeItem("dc_user");
    };

    const value: AuthContextType = {
        user,
        token, 
        loading,
        login,
        logout,
        isAuthenticated: !!token,
        isAdmin: user?.role === "admin",
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}