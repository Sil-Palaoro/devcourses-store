import { Cart } from "../../entities/cart";

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
