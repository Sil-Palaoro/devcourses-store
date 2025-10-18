import { describe, expect, test } from "vitest";
import { getCartList } from "./get-cart-list";
import { cartServiceMock } from "../../services/mocks/cart-service-mock.integration";


describe("getCartList", async () =>{

    test("Should return the list of carts", async () => {
        const result = await getCartList({dependencies: {cartService: cartServiceMock}}); 
        expect(result).toStrictEqual([    
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
                priceSnapshot: 25000,
                quantity: 1,
            }],
            currency: "ARS",
            },
        ])
    })
});