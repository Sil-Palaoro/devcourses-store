import { CartService } from "../../services/cart-service";
import { CartItem } from "../../entities/cartItem";
import { addItemToCart } from "./add-item-to-cart";
import { createCart } from "./create-cart";


interface addItemOrCreateCartData {
    dependencies: { cartService: CartService},
    payload: {
        userId: string; 
        courseId: string;
        quantity: number;
        priceSnapshot: number;
    }
} 

export async function addItemOrCreateCart({ dependencies, payload }: addItemOrCreateCartData) {
    const { v4: uuid } = await import("uuid");
    const { userId, courseId, quantity, priceSnapshot } = payload;
    
    let cart = await dependencies.cartService.getByUserId(userId);
    if(!cart) {
        await createCart({
            dependencies,
            payload: {
                cart: {
                    id: uuid(),
                    userId,
                    items: [],
                    currency: "ARS"}}
        }); 
        cart = await dependencies.cartService.getByUserId(userId);
    };    
    if (!cart) return new Error("Error al crear el carrito");

    const newItem: CartItem = {
            id: uuid(),
            cartId: cart.id,
            courseId,
            quantity,
            priceSnapshot, 
        };

    const updatedCart = await addItemToCart({ 
        dependencies, 
        payload: {
            userId,
            ...newItem,
        }       
    });

    return updatedCart;
}
