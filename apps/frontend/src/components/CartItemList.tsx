import React from "react";
import CartItemCard from "./CartItemCard.js";
import { Cart, CartItem } from "@devcourses/domain";

interface CartItemListProps {
    cartItems: CartItem[];
    onRemoveItem: (cartItemId: string) => Promise<void>;
}

const CartItemList: React.FC<CartItemListProps> = ({ cartItems, onRemoveItem }) => {
    return (
        <div className="grid grid-cols-1 gap-6">
            {cartItems.map(cartItem => (
                <CartItemCard 
                    key={cartItem.id} 
                    cartItem={cartItem} 
                    onRemoveItem={onRemoveItem} 
                />
            ))}
        </div>
    );
};

export default CartItemList;