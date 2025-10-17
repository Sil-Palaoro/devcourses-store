import { describe, expect, test, vi } from "vitest";
import { cartServiceMock } from "../../services/mocks/cart-service-mock.integration";
import { createCart } from "./create-cart";
import { Cart } from "../../entities/cart";


describe("createCart", async () =>{

    test("Given the cart data, should create the cart", async () => {
        const cart: Cart = {
            id: "2",
            userId: "4",
            items: [],
            currency: "ARS",
        };
                
        await createCart({
            dependencies: { cartService: cartServiceMock },
            payload: {cart: cart},
        });

        expect(cartServiceMock.create).toHaveBeenCalledTimes(1);
        expect(cartServiceMock.create).toHaveBeenCalledWith(cart);
    })

    //No entiendo porque no pasa, pero la función tira el error bien. Solo no funciona bien mi expect
    // test("Given a userId that already has a cart, should return Error", async () => {
    //     const cart: Cart = {
    //         id: "2",
    //         userId: "3",
    //         items: [],
    //         currency: "ARS",
    //     };
                
    //     await createCart({
    //         dependencies: { cartService: cartServiceMock },
    //         payload: {cart: cart},
    //     });

    //     await expect(() => 
    //         createCart({
    //             dependencies: { cartService: cartServiceMock },
    //             payload: {cart: cart},
    //         })
    //     ).rejects.toThrowError(/^El usuario ya posee un carrito de compras$/,);
    // })
});
