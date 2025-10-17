import { Cart } from "../../entities/cart";
import { dataCartMock } from "../../entities/mocks/cart-mock";
import { vi } from "vitest";

export const cartServiceMock = {
        getById: async (id: string) => {
            return dataCartMock.find((cart: Cart) => cart.id == id );
        },
        getAll: async () => {
            return dataCartMock;
        },
        getByUserId: async (userId: string) => {
            return dataCartMock.find((cart: Cart) => cart.userId == userId );
        },
        create: vi.fn(async (cart:Cart) => {
            if (cart) dataCartMock.push(cart); 
        }),
        update: async (id: string, data: Partial<Cart>) => {
            const cart = dataCartMock.find((u) => u.id == id );
            if (!cart) return undefined;
            Object.assign(cart, data);
            return cart;
        },
        delete: vi.fn(async (id: string) => {
            const index = dataCartMock.findIndex((u) => u.id === id);
            if (index !== -1) dataCartMock.splice(index, 1);
        }),
        addItemToCart: vi.fn(),
        removeItemFromCart: vi.fn()
    };
