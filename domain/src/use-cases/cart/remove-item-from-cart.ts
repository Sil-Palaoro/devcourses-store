import { CartService } from "../../services/cart-service";
import { updateCart } from "./update-cart";

interface RemoveItemFromCartData {
    dependencies: { cartService: CartService},
    payload: {
        userId: string; 
        cartItemId: string; 
    }
} 

export async function removeItemFromCart({ dependencies, payload }: RemoveItemFromCartData) {
    const { userId, cartItemId } = payload;

    let cart = await dependencies.cartService.getByUserId(userId);
    if(!cart) return new Error("El usuario no tiene un carrito de compras");   

    const existingItem = cart.items.find((item) => item.id === cartItemId);
    if(!existingItem) return new Error("El item no existe en el carrito de compras");

    const updatedItems = cart.items.filter((item) =>item.id !== cartItemId)


    const updatedCart = await updateCart({
        dependencies: dependencies,
        payload: {
            id: cart.id,
            data: {
                items: updatedItems,
            },
        },
    });

    if (!updatedCart) return new Error("Error al actualizar el carrito después de eliminar el item");

    return updatedCart;
}