import { mockOrders } from "../../entities/mocks/order-mocks";
import { OrderService } from "../order-service";
import { vi } from "vitest";


export const orderServiceMockIntegration: OrderService = {
        getAll: async () => mockOrders,
        getById: async (id: string) => mockOrders.find((u) => u.id == id ),    
        createOrder: vi.fn(),
        // completeOrder: vi.fn(),
        cancelOrder: vi.fn(),
        refundOrder: vi.fn(),
        updateStatus: vi.fn(async (id, status) => {
            const order = await orderServiceMockIntegration.getById(id);
            if (!order) return undefined;
            order.status = status;
            return order;
        }),
        // addItemsToOrder: vi.fn(),
        getOrdersForUser: async (userId: string) => {
            const orders = mockOrders.filter((u) => u.userId == userId );
            return orders;     
        }
    };
