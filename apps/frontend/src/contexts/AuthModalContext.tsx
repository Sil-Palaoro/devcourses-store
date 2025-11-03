import React, { createContext, useContext, useState, ReactNode } from "react";
import { Modal } from "../components/Modal";
import Login from "../features/auth/login";
import Register from "../features/auth/register";

interface AuthModalContextProps {
    openLoginModal: () => void;
    openRegisterModal: () => void;
    closeModals: () => void;
}

const AuthModalContext = createContext<AuthModalContextProps | undefined>(undefined);

export const AuthModalProvider = ({ children }: { children: ReactNode}) => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const openLoginModal = () => {
        setIsRegisterOpen(false);
        setIsLoginOpen(true);
    };

    const openRegisterModal = () => {
        setIsRegisterOpen(true);
        setIsLoginOpen(false);
    };  
    
    const closeModals = () => {
        setIsRegisterOpen(false);
        setIsLoginOpen(false);
    };

    return (
        <AuthModalContext.Provider value={{ openLoginModal, openRegisterModal, closeModals}} >
            {children}

            <Modal title="Iniciar sesión" isOpen={isLoginOpen} onClose={closeModals}>
              <Login />
            </Modal>

            <Modal title="Registro" isOpen={isRegisterOpen} onClose={closeModals}>
              <Register />
            </Modal>
        </AuthModalContext.Provider>
    );
};

export const useAuthModals = () => {
    const ctx = useContext(AuthModalContext);
    if (!ctx) throw new Error("useAuthModals debe usarse dentro de un AuthModalProvider");
    return ctx;
};