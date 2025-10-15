import type { Entity } from "../utils/types/entity";
import type { OrderStatus } from "./order";

export interface Payment extends Entity {
    orderId: Entity["id"];
    gateway: string;
    gatewayPaymentId: Entity["id"];
    status: OrderStatus;
    amount: number;       
    rawResponse: JSON;
    createdAt: Date;
}