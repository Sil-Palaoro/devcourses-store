import { describe, expect, test } from "vitest";
import { cartServiceMock } from "../../services/mocks/cart-service-mock.integration";
import { getCartByUserId } from "./get-cart-by-userId";


describe("getCartByUserId", async () =>{

    test("Given the userId, should return the cart information", async () => {
        const result = await getCartByUserId({
            dependencies: {cartService: cartServiceMock},
            payload: {userId: "2"}}
        ); 
        expect(result).toStrictEqual(
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
        )
    })

    test("Given an invalid userId, should return an error", async () => {
        const result = await getCartByUserId({
            dependencies: {cartService: cartServiceMock},
            payload: {userId: "5"}}
        ); 
        expect(result).toBeInstanceOf(Error)
    })
});