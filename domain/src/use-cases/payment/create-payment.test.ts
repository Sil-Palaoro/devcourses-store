import { describe, test, expect, vi } from "vitest";
import { createPayment } from "./create-payment";
import { CreatePaymentDTO } from "../../entities/payment";
import { orderServiceMockIntegration } from "../../services/mocks/order-service-mock.integration";
import { paymentServiceMockUnit } from "../../services/mocks/payment-service-mock.unit";

vi.mock("uuid", () => ({ v4: () => "mocked-uuid" }));


describe("createPayment", () => {
    test("Create payments with order data", async () => {
        const payload: CreatePaymentDTO = {
                orderId: "4",
                userId: "1",
                provider: "MercadoPago", 
            };

        const payment = await createPayment({
            dependencies: { 
                paymentService: paymentServiceMockUnit, 
                orderService: orderServiceMockIntegration },
            payload: payload
        }); 
        
        expect(paymentServiceMockUnit.createPayment).toHaveBeenCalledWith({
            id: "mocked-uuid",
            orderId: "4",
            userId: "1",
            amount: 25000,
            currency: "ARS",
            status: "pending",
            provider: "MercadoPago",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
             
        expect(paymentServiceMockUnit.createPayment).toHaveBeenCalledTimes(1);       
    })
} )