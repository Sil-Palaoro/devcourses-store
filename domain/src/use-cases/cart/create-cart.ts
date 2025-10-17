import { Cart } from "../../entities/cart";
import { CartService } from "../../services/cart-service";

interface CreateCartData {
    dependencies: {cartService: CartService};
    payload: {cart: Cart}
};

export async function createCart({dependencies, payload}: CreateCartData) { 
    const existingCart = await dependencies.cartService.getByUserId(payload.cart.userId);
    
    if(existingCart) throw new Error("El usuario ya posee un carrito de compras");

    return await dependencies.cartService.create(payload.cart);
};
