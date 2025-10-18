import type { Entity } from "../utils/types/entity";

export interface CartItem extends Entity {
    cartId: Entity["id"];
    courseId: Entity["id"];
    quantity: number;       //default:1
    priceSnapshot: number;          //snapshot
}