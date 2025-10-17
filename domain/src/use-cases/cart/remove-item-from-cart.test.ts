import { describe, expect, test, vi } from "vitest";
import { cartServiceMock } from "../../services/mocks/cart-service-mock.integration";
import { removeItemFromCart } from "./remove-item-from-cart";

vi.mock("uuid", () => ({ v4: () => "mocked-uuid" }));

describe("removeItemFromCart", async () =>{

    test("Given the userId and the cartItemId, should remove a CartItem from the Cart", async () => {

        const payload = {
            userId: "2",
            cartItemId: "1",
        };
        
        const updatedCart = await removeItemFromCart({
            dependencies: { cartService: cartServiceMock },
            payload: payload,
        });
    
        expect(updatedCart).toStrictEqual(
            {id: "3",
            userId: "2",
            items: [],
            currency: "ARS",
            },
        ); 

        if(updatedCart instanceof Error) {
          throw updatedCart;
        }
        
        expect(updatedCart.items).toHaveLength(0);
    });

    test("Given a userId without a cart, should throw an error", async () => {
      const payload = {
        userId: "999", 
        cartItemId: "3",
      };

      await expect(
        removeItemFromCart({
          dependencies: { cartService: cartServiceMock },
          payload: payload,
        })
      ).rejects.toThrow("El usuario no tiene un carrito de compras");
    });

    test("Given a courseId that doesn't exists in the cart, should throw an error", async () => {
      const payload = {
        userId: "2",
        cartItemId: "999", 
      };

      await expect(
        removeItemFromCart({
          dependencies: { cartService: cartServiceMock },
          payload: payload,
        })
      ).rejects.toThrow("El item no existe en el carrito de compras");
    });
});
