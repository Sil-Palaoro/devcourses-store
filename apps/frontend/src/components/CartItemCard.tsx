import React, { useState } from "react";
import { Cart, CartItem } from "@devcourses/domain";
import { Button } from "./Button.js";

//TODO: cambiar el curso Id por el title del curso

interface CartItemCardProps {
    cartItem: CartItem;
    onRemoveItem: (cartItemId: string) => Promise<void>;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ cartItem, onRemoveItem }) => {
    const [loading, setLoading] = useState(false);

    return (
        <div className="bg-darkLight border border-purpleNeon rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold mb-2">Curso ID: {cartItem.courseId}</h2>
            <p className="text-gray-400 text-sm mb-4">Cantidad: {cartItem.quantity}</p>
            <div className="flex justify-between items-center">
                <span className="text-purpleNeon font-bold pr-20">
                    Subtotal ${cartItem.priceSnapshot * cartItem.quantity}
                </span>
                <Button 
                    primary={false} 
                    label={loading ? "Cargando..": "Quitar"} 
                    onClick={()=> onRemoveItem(cartItem.id)} />     
            </div>
        </div>
    );
};

export default CartItemCard;