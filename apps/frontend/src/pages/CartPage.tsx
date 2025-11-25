import React, { useEffect } from "react";
import CartItemList from "../components/CartItemList";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";


const CartPage: React.FC = () => {
    const { cart, loading, error, removeItem, fetchCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {     
        fetchCart();
    }, [])

    if (loading) return <p className="text-center mt-10"> Cargando carrito...</p>
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>


    const total =  cart?.items.reduce(
        (acc, item) => acc + item.priceSnapshot * item.quantity, 0
    );
    

    return (
        <main className="max-w-6xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>
            
            {cart && cart.items.length > 0 ?(
                <>
                    <CartItemList 
                        cartItems={cart.items} 
                        onRemoveItem={removeItem} 
                    />
                    <div className=" mt-6 border-t border-gray-700 pt-4">
                        <p className="text-xl font-semibold mb-6">
                            Método de pago: MercadoPago
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-semibold">
                            Total: ${total?.toFixed(2)}
                        </p>
                        <br/>

                        <Button 
                            label={loading ? "Cargando.." : "Confirmar compra"} 
                            onClick={() => navigate("/checkout")} 
                        />
                    </div>
                </>
            ) : (
                <div className="text-center mt-10">
                    <p className="text-gray-400 mb-4">Tu carrito está vacío</p>
                    <Button 
                        label={loading ? "Cargando.." : "Explorar cursos"} 
                        onClick={() => navigate("/#cursos")} 
                    />
                </div>
            )}
        </main>
    );
};

export default CartPage;
