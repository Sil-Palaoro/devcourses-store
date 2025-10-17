import { Cart } from "../entities/cart";
import { CartItem } from "../entities/cartItem";
import { Service } from "../utils/types/service";

export interface CartService extends Service<Cart>{
    getByUserId: (userId: string) => Promise<Cart | undefined>;
    addItemToCart: (userId: string, courseId: string, priceSnapshot: number) => Promise<Cart>;
    removeItemFromCart: (userId: string, cartItemId: string) => Promise<Cart>;
};