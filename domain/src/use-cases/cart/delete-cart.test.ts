import { describe, expect, test } from "vitest";
import { cartServiceMock } from "../../services/mocks/cart-service-mock.integration";
import { deleteCart } from "./delete-cart";


describe("deleteCart", async () =>{

    test("Given an id, should delete the cart", async () => {
        const id = "6";
        await deleteCart({
            dependencies: {cartService: cartServiceMock},
            payload: { id }}
        ); 
        expect(cartServiceMock.delete).toHaveBeenCalledTimes(1);
        expect(cartServiceMock.delete).toHaveBeenCalledWith(id);
    })
});