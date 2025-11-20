import { vi } from "vitest";
import { mockPaymentBase, mockPayments } from "../../entities/mocks/payment-mock";
import { PaymentStatus } from "src/entities/payment";

export const paymentServiceMockIntegration = {
    getAll: async () => mockPayments,
    getById: async (id: string) => mockPayments.find((u) => u.id == id ),    
    createPayment: vi.fn(),
    completePayment:vi.fn(async (paymentId, providerPaymentId) => {
            return {
                id: paymentId,
                providerPaymentId,
                status: "completed" as PaymentStatus,
                ...mockPaymentBase,
            };
        }),
    failPayment: vi.fn(async (paymentId, providerPaymentId) => {
            return {
                id: paymentId,
                providerPaymentId,
                status: "failed" as PaymentStatus,
                ...mockPaymentBase,
            };
        }),
    refundPayment: vi.fn(),
    getPaymentsForOrder: async (orderId: string) => {
        const payments = mockPayments.filter((u) => u.orderId == orderId );
        return payments;     
    },
    getPaymentsForUser: async (userId: string) => {
        const payments = mockPayments.filter((u) => u.userId == userId );
        return payments;     
    },
};