import { describe, expect, test, vi } from "vitest";
import { cancelOrder } from "./cancel-order";
import { orderServiceMockIntegration } from "../../services/mocks/order-service-mock.integration";

vi.mock("uuid", () => ({ v4: () => "mocked-uuid" }));


describe("cancelOrder", async () =>{

    test("Given the orderId, the order should be canceled", async () => { 
        const payload = {
            orderId: "2",
            paymentId: "2",
        };

        const updatedOrder = await cancelOrder({
            dependencies: { orderService: orderServiceMockIntegration },
            payload: payload
        });    
    

        expect(updatedOrder).toMatchObject({
            id: "2",
            userId: "1",
            items: [
                {
                    id: "mocked-uuid",
                    orderId: "mocked-uuid",
                    courseId: "2",
                    price: 25000,
                }
            ],
            totalAmount: 25000,
            currency: "ARS",
            status: "cancelled",
            paymentMethod: "MercadoPago",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        },
        );
             
        expect(orderServiceMockIntegration.updateStatus).toHaveBeenCalledWith("2", "cancelled");
        
    });

    test("If order status !== 'pending', should return error", async () => {
        const payload = {
            orderId: "1",
            paymentId: "2",
        };

        const order = await cancelOrder({
            dependencies: { orderService: orderServiceMockIntegration },
            payload: payload
        });   

      expect(order).toBeInstanceOf(Error)

    });
});
    