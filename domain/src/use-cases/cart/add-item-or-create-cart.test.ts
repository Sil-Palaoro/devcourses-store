import { describe, expect, test, vi } from "vitest";
import { cartServiceMock } from "../../services/mocks/cart-service-mock.integration";
import { addItemOrCreateCart } from "./add-item-or-create-cart";

vi.mock("uuid", () => ({ v4: () => "mocked-uuid" }));

describe("addItemOrCreateCart", async () =>{

    test("Given the userId, the courseId and priceSnapshot, should add a CartItem to the Cart if it exists", async () => {

        const payload = {
            userId: "1",
            courseId: "3",
            quantity: 1,
            priceSnapshot: 25000
        };
        
        const updatedCart = await addItemOrCreateCart({
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

    test("Given a userId without a cart, should create one and add item in it", async () => {
        const payload = {
          userId: "999", 
          courseId: "3",
          quantity: 1,
          priceSnapshot: 30000,
        };

        const result = await addItemOrCreateCart({
            dependencies: { cartService: cartServiceMock },
            payload: payload,
          });

        expect(result).toStrictEqual(
                {id: "mocked-uuid",
                userId: "999",
                items: [
                    {
                        id: "mocked-uuid",
                        cartId: "mocked-uuid",
                        courseId: "3",
                        priceSnapshot: 30000,
                        quantity: 1,
                    }
                ],
                currency: "ARS",
                }    
        ); 

        if(result instanceof Error) {
          throw result;
        }

        expect(cartServiceMock.create).toHaveBeenCalledTimes(1);
    });

});
