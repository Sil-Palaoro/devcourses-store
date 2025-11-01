import React from "react";
import { Cart } from "@devcourses/domain";
import { CartContext } from "../contexts/CartContext";

export const CartProviderMock: React.FC<{ cart?: Cart | null; children: React.ReactNode }> = ({
    cart,
    children 
}) => {
    return (
        <CartContext.Provider 
            value={{
                cart: cart ?? null, 
                loading: false,
                error: null,
                fetchCart: async () => {},
                removeItem: async () => {},
                setCart: () => {},
            }}
        >
            {children}
        </CartContext.Provider>
    );
};