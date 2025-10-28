import React from "react";

export const Labels = {
    LOGIN: "Ingresar",
    LOGOUT: "Cerrar sesión",
    LOGININ: "Ingresando..",
    REGISTER: "Registrarme",
    LOADING: "Cargando.."
} as const;

export type Label = (typeof Labels)[keyof typeof Labels]; 

interface ButtonProps {
    onClick: (e: React.FormEvent) => void;
    isAuthenticated?: boolean;
    label: Label;
    isLoading?: boolean;
    disabled?: boolean;
}

export const Button = ({
    isLoading = false,
    label,
    disabled = false,
    onClick
    }: ButtonProps): React.JSX.Element => {
    return (
        <button 
            type="button"
            disabled={disabled || isLoading}
            onClick={(e: React.FormEvent) => onClick(e)}
            className={
                `bg-gradient-neon 
                text-black 
                px-3 
                py-1 
                rounded-md 
                ${disabled ? "opacity-80 cursor-not-allowed": "hover:opacity-90"} 
                transition-opacity 
                shadow-neon`}
            
        >
          {label}
        </button>
    )
}