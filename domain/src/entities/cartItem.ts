import type { Entity } from "../utils/index.js";

export interface CartItem extends Entity {
    cartId: Entity["id"];
    courseId: Entity["id"];
    quantity?: number;       //default:1
}