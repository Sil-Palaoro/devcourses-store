import api from "./api";
import { Cart } from "@devcourses/domain";

interface CartService {
    addItem: (userId: string, 
        courseId: string,
        price: number,
        quantity?: number) => Promise<unknown>;
    createCart: (userId: string) => Promise<unknown>;
    getByUserId: (userId: string) => Promise<Cart | null>;
    removeItem: (userId: string, cartItemId: string) => Promise<Cart | null>;
}

export const cartService: CartService = {
    async addItem(
        userId, 
        courseId,
        price,
        quantity = 1
     ) {
        return api.patch("/cart/add-item", {
            userId,
            courseId,
            quantity,
            priceSnapshot: price,
        });
     },

     async createCart(userId) {
        return api.post("/cart", {
            userId,
            items: [],
            currency: "ARS",
        });
     },

     async getByUserId(userId) {
        return api.get(`/cart/by-user-id/${userId}`)
     },

     async removeItem(userId, cartItemId) {
        return api.patch("cart/remove-item", { userId, cartItemId });
     },
}