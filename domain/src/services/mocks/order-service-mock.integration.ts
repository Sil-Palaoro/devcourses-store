import { mockOrders } from "../../entities/mocks/order-mocks";
import { vi } from "vitest";


export const orderServiceMockIntegration = {
        getAll: async () => mockOrders,
        getById: async (id: string) => mockOrders.find((u) => u.id == id ),    
        createOrder: vi.fn(),
        completeOrder: vi.fn(),
        cancelOrder: vi.fn(),
        refundOrder: vi.fn(),
        updateStatus: vi.fn(),
        addItemsToOrder: vi.fn(),
        getOrdersForUser: vi.fn()    
    };
