import { CartService } from "../../services/cart-service";
import { Cart } from "../../entities/cart";


interface UpdateCartData {
    dependencies: {cartService: CartService};
    payload: {
        id: string,
        data: Partial<Cart>}
};

export async function updateCart({dependencies, payload}: UpdateCartData) {   

    const updatedCart = await dependencies.cartService.update(payload.id, payload.data);

    if (!updatedCart) return new Error("El carrito de compras no se ha actualizado");    

    return  updatedCart;
};