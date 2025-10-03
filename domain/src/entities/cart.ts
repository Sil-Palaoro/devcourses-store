import type { Entity } from "../utils/index.js";

export interface Cart extends Entity {
    userId: Entity["id"];
    createdAt: Date;
    updatedAt: Date;
}