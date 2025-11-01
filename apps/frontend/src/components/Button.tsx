import React from "react";

export const Labels = {
    LOGIN: "Ingresar",
    LOGOUT: "Cerrar sesión",
    LOGININ: "Ingresando..",
    REGISTER: "Registrarme",
    LOADING: "Cargando..",
    KNOWMORE: "Ver más",
    ADDTOCART: "Añadir al carrito",
    ADDINGTOCART: "Agregando..",
    REMOVEITEM: "Quitar",
    CONFIRMBUY: "Confirmar compra",
    EXPLORECOURSES: "Explorar cursos",
} as const;

export type Label = (typeof Labels)[keyof typeof Labels]; 

interface ButtonProps {
    primary?: boolean;
    onClick: (e: React.FormEvent) => void;
    isAuthenticated?: boolean;
    label: Label;
    isLoading?: boolean;
    disabled?: boolean;
}

export const Button = ({
    primary = true,
    isLoading = false,
    label,
    disabled = false,
    onClick
    }: ButtonProps): React.JSX.Element => {
    const mode = primary ? `bg-gradient-neon 
                text-black 
                px-3 
                py-1 
                rounded-md 
                ${disabled ? "opacity-80 cursor-not-allowed": "hover:opacity-90"} 
                transition-opacity 
                shadow-neon` 
                : `bg-purpleNeon 
                text-black 
                py-1 
                px-3 
                rounded-lg 
                text-sm 
                ${disabled ? "opacity-80 cursor-not-allowed": "hover:bg-purple-500"}                 
                transition
                shadow-neon`;

    return (
        <button 
            type="button"
            disabled={disabled || isLoading}
            onClick={(e: React.FormEvent) => onClick(e)}
            className={mode}            
        >
          {label}
        </button>
    )
}
