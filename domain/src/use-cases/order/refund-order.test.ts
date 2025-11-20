import { describe, expect, test, vi } from "vitest";
import { refundOrder } from "./refund-order";
import { orderServiceMockIntegration } from "../../services/mocks/order-service-mock.integration";

vi.mock("uuid", () => ({ v4: () => "mocked-uuid" }));


describe("refundOrder", async () =>{

    test("Given the orderId and paymentId, the order should be updated to 'refunded' status", async () => {
        const payload = {
            orderId: "1",
            paymentId: "2",
        };

        const updatedOrder = await refundOrder({
            dependencies: { orderService: orderServiceMockIntegration },
            payload: payload
        });    
    

        expect(updatedOrder).toMatchObject({
            id: "1",
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
            status: "refunded",
            paymentMethod: "MercadoPago",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        },
        );
             
        expect(orderServiceMockIntegration.updateStatus).toHaveBeenCalledWith("1", "refunded");
        
    });

    test("If order status !== 'paid' or 'succeeded', should return error", async () => {
        const payload = {
            orderId: "2",
            paymentId: "2",
        };

        const order = await refundOrder({
            dependencies: { orderService: orderServiceMockIntegration },
            payload: payload
        });   

      expect(order).toBeInstanceOf(Error)

    });
});
    