import { describe, expect, test } from "vitest";
import { cartServiceMock } from "../../services/mocks/cart-service-mock.integration";
import { updateCart } from "./update-cart";


describe("updateCart", async () =>{

    test("Given an id and the partial data to update, should return the cart updated", async () => {
        const result = await updateCart({
            dependencies: {cartService: cartServiceMock},
            payload: {id: "3",
                data: {
                    items: [                
                        {id: "1",
                        cartId: "3",
                        courseId: "2",
                        quantity: 1,
                        priceSnapshot: 25000
                        }],                
                }
            },}
        ); 
        expect(result).toStrictEqual(
            {id: "3",
            userId: "2",
            items: [                
                {id: "1",
                cartId: "3",
                courseId: "2",
                quantity: 1,
                priceSnapshot: 25000
                }
            ],
            currency: "ARS",
            },
        )
    })

    test("Given an invalid id, should return an error", async () => {
        const result = await updateCart({
            dependencies: {cartService: cartServiceMock},
            payload: {id: "6",
                data: {}
            }}
        ); 
        expect(result).toBeInstanceOf(Error)
    })
});