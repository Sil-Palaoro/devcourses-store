import { describe, expect, test, vi, beforeEach } from "vitest";
import { failPayment } from "./fail-payment";
import { orderServiceMockIntegration } from "../../services/mocks/order-service-mock.integration";
import { paymentServiceMockIntegration } from "../../services/mocks/payment-service-mock.integration";

describe("failPayment", () => {
    test("Given orderId and paymentId, should fail payment and update order status", async () => {

        const payload = {
            orderId: "2",
            paymentId: "2",
            providerPaymentId: "X"
        };

        const result = await failPayment({
            dependencies: {
                orderService: orderServiceMockIntegration,
                paymentService: paymentServiceMockIntegration
            },
            payload
        });

        expect(paymentServiceMockIntegration.failPayment)
            .toHaveBeenCalledWith("2", "X");

        expect(orderServiceMockIntegration.updateStatus)
            .toHaveBeenCalledWith("2", "failed");

        expect(result).toEqual({
            id: "2",
            providerPaymentId: "X",
            status: "failed",
            orderId: "1",
            userId: "1",
            amount: 25000,
            currency: "ARS",
            provider: "MercadoPago", 
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    test("If order does not exist → return Error", async () => {
        const result = await failPayment({
            dependencies: {
                orderService: orderServiceMockIntegration,
                paymentService: paymentServiceMockIntegration
            },
            payload: { orderId: "999", paymentId: "2", providerPaymentId: "X" }
        });

        expect(result).toBeInstanceOf(Error);
        if (result instanceof Error) {
            expect(result.message).toContain("No se encontró la orden");
        }    
    });

    test("If order status !== pending → return Error", async () => {
        const result = await failPayment({
            dependencies: {
                orderService: orderServiceMockIntegration,
                paymentService: paymentServiceMockIntegration
            },
            payload: { orderId: "1", paymentId: "99", providerPaymentId: "X" }
        });

        expect(result).toBeInstanceOf(Error);
        
        if (result instanceof Error) {
            expect(result.message).toContain("no se puede marcar");
        }
    });

    test("If failPayment returns undefined → return Error", async () => {
        vi.spyOn(paymentServiceMockIntegration, "failPayment").mockImplementationOnce(async () => undefined as any);

        const result = await failPayment({
            dependencies: {
                orderService: orderServiceMockIntegration,
                paymentService: paymentServiceMockIntegration
            },
            payload: { orderId: "2", paymentId: "2", providerPaymentId: "X" }
        });

        expect(result).toBeInstanceOf(Error);

        if (result instanceof Error) {
            expect(result.message).toContain("La orden no se puede marcar");
        }
    });
});
