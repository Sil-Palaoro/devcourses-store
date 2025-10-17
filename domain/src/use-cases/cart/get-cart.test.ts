import { describe, expect, test } from "vitest";
import { getCart } from "./get-cart";
import { cartServiceMock } from "../../services/mocks/cart-service-mock.integration";


describe("getCart", async () =>{

    test("Given a  cartId, should return the cart information", async () => {
        const result = await getCart({
            dependencies: {cartService: cartServiceMock},
            payload: {id: "1"}}
        ); 
        expect(result).toStrictEqual({
            id: "1",
            userId: "1",
            items: [],
            currency: "ARS",
        })
    })

    test("Given an invalid id, should return an error", async () => {
        const result = await getCart({
            dependencies: {cartService: cartServiceMock},
            payload: {id: "4"}}
        ); 
        expect(result).toBeInstanceOf(Error)
    })
});