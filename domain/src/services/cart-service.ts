import { Cart } from "../entities/cart";
import { CartItem } from "../entities/cartItem";
import { Service } from "../utils/types/service";

export interface CartService extends Service<Cart>{
    getByUserId: (userId: string) => Promise<Cart | undefined>;
    addItemToCart: (courseId: string, userId: string) => Promise<Cart>;
    removeItemFromCart: (cartItem: CartItem) => Promise<void>;
};