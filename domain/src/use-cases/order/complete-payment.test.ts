import { describe, expect, test, vi } from "vitest";
import { completePayment } from "./complete-payment";
import { orderServiceMockUnit } from "../../services/mocks/order-service-mock.unit";
import { orderServiceMockIntegration } from "../../services/mocks/order-service-mock.integration";

vi.mock("uuid", () => ({ v4: () => "mocked-uuid" }));


describe("completePayment", async () =>{

    test("Given the orderId and paymentId, the order should be updated to 'paid' status", async () => {
      // Simula comportamiento real de updateStatus
        orderServiceMockIntegration.updateStatus = vi.fn(async (id, status) => {
          const order = await orderServiceMockIntegration.getById(id);
          if (!order) return undefined;
          order.status = status;
          return order;
        });
        
        const payload = {
            orderId: "2",
            paymentId: "2",
        };

        const updatedOrder = await completePayment({
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
            status: "paid",
            paymentMethod: "MercadoPago",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        },
        );
             
        expect(orderServiceMockIntegration.updateStatus).toHaveBeenCalledWith("2", "paid");
        
    });

    test("If order status !== 'pending', should return error", async () => {
        const payload = {
            orderId: "1",
            paymentId: "2",
        };

        const order = await completePayment({
            dependencies: { orderService: orderServiceMockIntegration },
            payload: payload
        });   

      expect(order).toBeInstanceOf(Error)

    });
});
    