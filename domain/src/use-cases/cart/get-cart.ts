import { CartService } from "../../services/cart-service";


interface GetcartData {
    dependencies: {cartService: CartService};
    payload: {id: string}
};

export async function getCart({dependencies, payload}: GetcartData) {   

    const cart = await dependencies.cartService.getById(payload.id)

    if (!cart) return new Error();

    return  cart;
};