import { Order, OrderStatus, CreateOrderDTO } from "src/entities/order";
import { ReadOnlyService } from "../utils/types/service";
import { OrderItem } from "src/entities/orderItem";

export interface OrderService extends ReadOnlyService<Order> {
    createOrder: (data: Order) => Promise<Order>;
    // completeOrder: (orderId: string, paymentId: string) => Promise<Order | undefined>;
    cancelOrder: (orderId: string) => Promise<Order | undefined>;
    refundOrder: (orderId: string) => Promise<Order | undefined>;
    updateStatus: (orderId: string, status: OrderStatus) => Promise<Order | undefined>;
    // addItemsToOrder: (orderId: string, items: OrderItem[]) => Promise<Order | undefined>;
    getOrdersForUser: (userId: string) => Promise<Order[] | undefined>;
};