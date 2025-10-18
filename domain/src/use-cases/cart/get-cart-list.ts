import { CartService } from "../../services/cart-service";


interface GetcartList {
    dependencies: {cartService: CartService};
};

export async function getCartList({dependencies}: GetcartList) {   

    const allcarts = await dependencies.cartService.getAll();

    if (allcarts.length === 0) throw new Error("No hay ningún carrito de compras");

    return  allcarts;
};