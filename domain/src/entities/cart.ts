import type { Entity } from "../utils/types/entity";
import type { CartItem } from "./cartItem";

export const Currencies = {
    ARS: "ARS",
} as const;

export type Currency = (typeof Currencies)[keyof typeof Currencies]; 

export interface Cart extends Entity {
    userId: Entity["id"];
    items: CartItem[];
    currency: Currency;
    // createdAt: Date;
    // updatedAt: Date;
}
