import { describe, expect, test, vi } from "vitest";
import { cartServiceMock } from "../../services/mocks/cart-service-mock.integration";
import { addItemToCart } from "./add-item-to-cart";

vi.mock("uuid", () => ({ v4: () => "mocked-uuid" }));

describe("addItemtoCart", async () =>{

    test("Given the userId, the courseId and priceSnapshot, should add a CartItem to the Cart", async () => {

        const payload = {
            userId: "1",
            courseId: "3",
            quantity: 1,
            priceSnapshot: 25000
        };
        
        const updatedCart = await addItemToCart({
            dependencies: { cartService: cartServiceMock },
            payload: payload,
        });
    
        expect(updatedCart).toStrictEqual(
                {id: "1",
                userId: "1",
                items: [
                    {
                        id: "mocked-uuid",
                        cartId: "1",
                        courseId: "3",
                        priceSnapshot: 25000,
                        quantity: 1,
                    }
                ],
                currency: "ARS",
                }    
        ); 

        if(updatedCart instanceof Error) {
          throw updatedCart;
        }

        expect(updatedCart.items).toHaveLength(1);
    });

    test("Given a userId without a cart, should throw an error", async () => {
      const payload = {
        userId: "999", 
        courseId: "3",
        quantity: 1,
        priceSnapshot: 1200,
      };

      const result = await addItemToCart({
          dependencies: { cartService: cartServiceMock },
          payload: payload,
        })
      expect(result).toBeInstanceOf(Error);
    });

    test("Given a courseId that already exists in the cart, should throw an error", async () => {
      const payload = {
        userId: "2",
        courseId: "2", 
        quantity: 1,
        priceSnapshot: 1200,
      };

      const result = await addItemToCart({
          dependencies: { cartService: cartServiceMock },
          payload: payload,
        })
      

      expect(result).toBeInstanceOf(Error);
    });
});
