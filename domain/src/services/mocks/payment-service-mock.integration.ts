import { vi } from "vitest";
import { mockPayments } from "../../entities/mocks/payment-mock";

export const paymentServiceMockIntegration = {
    getAll: async () => mockPayments,
    getById: async (id: string) => mockPayments.find((u) => u.id == id ),    
    createPayment: vi.fn(),
    completePayment: vi.fn(),
    failPayment: vi.fn(),
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