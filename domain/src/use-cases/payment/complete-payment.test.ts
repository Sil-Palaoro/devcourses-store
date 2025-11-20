import { describe, expect, test, vi } from "vitest";
import { completePayment } from "../payment/complete-payment";
import { orderServiceMockIntegration } from "../../services/mocks/order-service-mock.integration";
import { paymentServiceMockIntegration } from "../../services/mocks/payment-service-mock.integration";

vi.mock("uuid", () => ({ v4: () => "mocked-uuid" }));


describe("completePayment", async () =>{

    test("Given the orderId and paymentId, complete payment and update order status", async () => {        
        const payload = {
            orderId: "2",
            paymentId: "2",
            providerPaymentId: "1"
        };

        const result = await completePayment({
            dependencies: { 
                paymentService: paymentServiceMockIntegration,
                orderService: orderServiceMockIntegration },
            payload: payload
        });    
    

        expect(paymentServiceMockIntegration.completePayment).toHaveBeenCalledWith("2", "1"),
        
             
        expect(orderServiceMockIntegration.updateStatus).toHaveBeenCalledWith("2", "paid");
        
        expect(result).toEqual({
            id: "2",
            providerPaymentId: "1",
            status: "completed",
            orderId: "1",
            userId: "1",
            amount: 25000,
            currency: "ARS",
            provider: "MercadoPago", 
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    test("If order status !== 'pending', should return error", async () => {
        const payload = {
            orderId: "1",       //En el mock tiene status "paid" 
            paymentId: "99",
            providerPaymentId: "XX"
        };

        const payment = await completePayment({
            dependencies: { 
                paymentService: paymentServiceMockIntegration,
                orderService: orderServiceMockIntegration },
            payload: payload
        });   

      expect(payment).toBeInstanceOf(Error)
    });

    test("If paymentService.completePayment returns undefined → return Error", async () => {
        vi.spyOn(paymentServiceMockIntegration, "completePayment").mockImplementationOnce(async () => undefined as any);

        const payload = {
            orderId: "2",  // pending
            paymentId: "2",
            providerPaymentId: "XYZ"
        };

        const result = await completePayment({
            dependencies: { 
                orderService: orderServiceMockIntegration,
                paymentService: paymentServiceMockIntegration
            },
            payload
        });

        expect(result).toBeInstanceOf(Error);
    });

});
    