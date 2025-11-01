import { Cart, CartItem } from "@devcourses/domain";

export const dataCartMock: Cart[] = [
    {id: "1",
    userId: "1",
    items: [],
    currency: "ARS",
    },
    {id: "2",
    userId: "3",
    items: [],
    currency: "ARS",
    },
    {id: "3",
    userId: "2",
    items: [{
        id: "1",
        cartId: "3",
        courseId: "2",
        quantity: 1,
        priceSnapshot: 25000
    }],
    currency: "ARS",
    },
];


export const cartItemsMock: CartItem[] = [
    {
        id: "1",
        cartId: "1",
        courseId: "2",
        quantity: 1,
        priceSnapshot: 25000
    },
    {
        id: "2",
        cartId: "1",
        courseId: "3",
        quantity: 1,
        priceSnapshot: 30000
    },
        {
        id: "3",
        cartId: "1",
        courseId: "1",
        quantity: 1,
        priceSnapshot: 35000
    },
];
