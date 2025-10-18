import { CartService } from "../../services/cart-service";
import { CartItem } from "../../entities/cartItem";
import { updateCart } from "./update-cart";


interface AddItemToCartData {
    dependencies: { cartService: CartService},
    payload: {
        userId: string; 
        courseId: string;
        quantity: number;
        priceSnapshot: number;
    }
} 

export async function addItemToCart({ dependencies, payload }: AddItemToCartData) {
    const { v4: uuid } = await import("uuid");
    const { userId, courseId, quantity, priceSnapshot } = payload;
    
    let cart = await dependencies.cartService.getByUserId(userId);
    if(!cart) throw new Error("El usuario no tiene un carrito de compras");    

    const existingItem = cart.items.find((item) => item.courseId === courseId);
    if(existingItem) throw new Error("El item ya existe en el carrito de compras");

    const newItem: CartItem = {
            id: uuid(),
            cartId: cart.id,
            courseId,
            quantity,
            priceSnapshot, 
        };

    const updatedCart = await updateCart({ dependencies, payload: {
            id: cart.id,
            data: {
                items: [...cart.items, newItem]
            }
        }
    });

    return updatedCart;
}




    // const updatedCart = {
    //     ...cart,
    //     items: [...cart.items, newItem],
    // };

    // await dependencies.cartService.update(cart.id, updatedCart)
