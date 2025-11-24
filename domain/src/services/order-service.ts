import { Order, OrderStatus } from "src/entities/order";
import { ReadOnlyService } from "../utils/types/service";

export interface OrderService extends ReadOnlyService<Order> {
    createOrder: (data: Order) => Promise<Order>;
    cancelOrder: (orderId: string) => Promise<Order | undefined>;
    refundOrder: (orderId: string) => Promise<Order | undefined>;
    updateStatus: (orderId: string, status: OrderStatus, paymentId?: string | null) => Promise<Order | undefined>;
    getOrdersForUser: (userId: string) => Promise<Order[] | undefined>;
};