import { Cart } from "../entities/cart";
import { Service } from "../utils/types/service";

export interface CartService extends Service<Cart>{
    getByUserId: (userId: string) => Promise<Cart | undefined>;
    addItemToCart: (userId: string, courseId: string, quantity: number, priceSnapshot: number) => Promise<Cart>;
    removeItemFromCart: (userId: string, cartItemId: string) => Promise<Cart>;
};