import { vi } from "vitest";

export const orderServiceMockUnit = {
    getAll: vi.fn(),
    getById: vi.fn(),
    createOrder: vi.fn(),
    // completeOrder: vi.fn(),
    cancelOrder: vi.fn(),
    refundOrder: vi.fn(),
    updateStatus: vi.fn(),
    // addItemsToOrder: vi.fn(),
    getOrdersForUser: vi.fn()
};