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
            const existingCart = dataCartMock.find((c) => c.userId === cart.userId);
             if (existingCart) {
               throw new Error("El usuario ya posee un carrito de compras");
            }
            dataCartMock.push(cart);                     
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
        addItemToCart: async (
            userId: string, 
            courseId: string, 
            priceSnapshot: number) => {
                const existingCart = dataCartMock.find((c) => c.userId === userId);
                 if (!existingCart) {
                   throw new Error("El usuario no posee un carrito de compras");
                }

                const existingItem = existingCart.items.find((item) => item.courseId === courseId);
                if(existingItem) throw new Error("El item ya existe en el carrito de compras");
                                
                const newItem = {
                    id: "4",
                    cartId: existingCart.id,
                    courseId,
                    quantity: 1,
                    priceSnapshot, 
                };
                existingCart.items.push(newItem);
                
                return existingCart;
            },
        removeItemFromCart: vi.fn()
    };
