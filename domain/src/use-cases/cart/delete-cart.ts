import { CartService } from "../../services/cart-service";

interface DeleteCartData {
    dependencies: {cartService: CartService};
    payload: {id: string}
};

export async function deleteCart({dependencies, payload}: DeleteCartData) {   
    await dependencies.cartService.delete(payload.id);
};
