import { CartService } from "../../services/cart-service";

interface GetCartDatabyEmail {
    dependencies: {cartService: CartService};
    payload: {userId: string}
};

export async function getCartByUserId({dependencies, payload}: GetCartDatabyEmail) {   
    const cart = await dependencies.cartService.getByUserId(payload.userId)
    if (!cart) return new Error("El usuario no posee un carrito de compras");
    return  cart;
};