import { CartService } from "../../services/cart-service";


interface GetcartList {
    dependencies: {cartService: CartService};
};

export async function getCartList({dependencies}: GetcartList) {   

    const allcarts = await dependencies.cartService.getAll();

    if (allcarts.length === 0) return [];;

    return  allcarts;
};