import { vi } from "vitest";

export const paymentServiceMockUnit = {
    getAll: vi.fn(),
    getById: vi.fn(),
    createPayment: vi.fn(),
    completePayment: vi.fn(),
    failPayment: vi.fn(),
    refundPayment: vi.fn(),
    getPaymentsForOrder: vi.fn(),
    getPaymentsForUser: vi.fn()
};