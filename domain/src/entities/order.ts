import type { Entity } from "../utils/types/entity";
import { OrderItem, CreateOrderItemDTO } from "./orderItem";


export const OrderStatusOptions = {
    PENDING: "pending",
    PAID: "paid",
    SUCCEEDED: "succeeded",
    FAILED: "failed",
    CANCELLED: "cancelled",
    REFUNDED: "refunded"
} as const;

export type OrderStatus = (typeof OrderStatusOptions)[keyof typeof OrderStatusOptions]; 

export interface Order extends Entity {
    userId: Entity["id"];
    totalAmount: number;
    currency: "ARS";
    status: OrderStatus;
    paymentId?: string | null;
    paymentMethod: string;
    items: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateOrderDTO {
    userId: string,
    totalAmount: number,
    currency: "ARS",
    paymentId?: string
    paymentMethod: string,
    items: CreateOrderItemDTO[],
}
