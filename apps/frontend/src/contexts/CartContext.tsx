import React, { createContext, useContext, useState, useEffect } from "react";
import { Cart } from "@devcourses/domain";
import { cartService } from "../services/cartService";
import { useAuth } from "./AuthContext";

interface CartContextValue {
    cart: Cart | null;
    loading: boolean;
    error: string | null;
    fetchCart: () => Promise<void>;
    removeItem: (itemId: string) => Promise<void>;
    setCart: React.Dispatch<React.SetStateAction<Cart | null>>;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { userId } = useAuth();
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCart  = async () => {
        if(!userId) return;

        try {
            setLoading(true);
            const cartData = await cartService.getByUserId(userId);
            setCart(cartData);
        } catch (err: any) {
            setError("No se pudo obtener el carrito");
        } finally {
            setLoading(false)
        };
    };

    const removeItem = async (cartItemId: string) => {
        if (!userId) return;

        const updatedCart = await cartService.removeItem(userId, cartItemId);
        if (!(updatedCart instanceof Error)) setCart(updatedCart);
    };

    useEffect(() => {
        fetchCart();
    }, [userId]);

    return (
        <CartContext.Provider value={{ cart, loading, error, fetchCart, removeItem, setCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart debe usars dentro de un CartProvider");
    return ctx;
};