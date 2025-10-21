import { describe, expect, test } from "vitest";
import { getCartList } from "./get-cart-list";
import { cartServiceMock } from "../../services/mocks/cart-service-mock.integration";
import { cartServiceMockUnit } from "../../services/mocks/cart-service-mock.unit";


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

    test("If there is no list should return an empty array", async () => {
        cartServiceMockUnit.getAll.mockResolvedValueOnce([]);

        const result = await getCartList({
            dependencies: {cartService: cartServiceMockUnit}}); 

        expect(result).toEqual([]);
        expect(Array.isArray(result)).toBe(true);
    })
})