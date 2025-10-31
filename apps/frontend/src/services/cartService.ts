import api from "./api";

interface CartService {
    addItem: (userId: string, 
        courseId: string,
        price: number,
        quantity?: number) => Promise<unknown>;
    createCart: (userId: string) => Promise<unknown>;
    getByUserId: (userId: string) => Promise<unknown>;
}

export const cartService: CartService = {
    async addItem(
        userId: string, 
        courseId: string,
        price: number,
        quantity = 1
     ) {
        return api.patch("/cart/add-item", {
            userId,
            courseId,
            quantity,
            priceSnapshot: price,
        });
     },

     async createCart(userId: string) {
        return api.post("/cart", {
            userId,
            items: [],
            currency: "ARS",
        });
     },

     async getByUserId(userId: string) {
        return api.get(`/cart/by-user-id/${userId}`)
     },
}