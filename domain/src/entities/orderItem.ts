import type { Entity } from "../utils/types/entity";

export interface OrderItem extends Entity {
    orderId: Entity["id"];
    courseId: Entity["id"];
    price: number;          
}

export interface CreateOrderItemDTO {
    courseId: Entity["id"];
    price: number;
}