import type { Entity } from "../utils/types/entity";


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
    paymentId: string;
    paymentMethod: string;
    createdAt: Date;
    updatedAt: Date;
}

