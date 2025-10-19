import { CartService } from "../../services/cart-service";

interface RemoveItemFromCartData {
    dependencies: { cartService: CartService},
    payload: {
        userId: string; 
        cartItemId: string; 
    }
} 

export async function removeItemFromCart({ dependencies, payload }: RemoveItemFromCartData) {
    const { userId, cartItemId } = payload;

    const updatedCart = await dependencies.cartService.removeItemFromCart(userId, cartItemId);

    return updatedCart;
}


    
    // let cart = await dependencies.cartService.getByUserId(userId);
    // if(!cart) throw new Error("El usuario no tiene un carrito de compras");    

    // const existingItem = cart.items.find((item) => item.id === cartItemId);
    // if(!existingItem) throw new Error("El item no existe en el carrito de compras");

    // const updatedCartItems = cart.items.filter((item) => item.id !== cartItemId)

    // const updatedCart = await updateCart({ dependencies, payload: {
    //         id: cart.id,
    //         data: {
    //             items: updatedCartItems
    //         }
    //     }
    // });
