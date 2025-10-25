import React from "react";

interface ButtonProps {
    onClick?: () => {};
    isAuthenticated?: boolean;
    label: string;
    isLoading?: boolean;
    disabled: boolean;
}

export const Button = ({
    isLoading = false,
    label,
    disabled = false,
     ...props
    }: ButtonProps): React.JSX.Element => {
    return (
        <button 
            type="button"
            disabled={disabled}
            className={
                `bg-gradient-neon 
                text-black 
                px-3 
                py-1 
                rounded-md 
                ${disabled ? "opacity-50 cursor-not-allowed": "hover:opacity-90"} 
                transition-opacity 
                shadow-neon`}
            {...props}
        >
          {label}
        </button>
    )
}