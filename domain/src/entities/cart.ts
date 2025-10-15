import type { Entity } from "../utils/types/entity";
import type { CartItem } from "./cartItem";

export interface Cart extends Entity {
    userId: Entity["id"];
    items: CartItem[];
    currency: "ARS";
    createdAt: Date;
    updatedAt: Date;
}

