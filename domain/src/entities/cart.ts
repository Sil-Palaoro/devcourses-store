import type { Entity } from "../utils/types/entity";

export interface Cart extends Entity {
    userId: Entity["id"];
    createdAt: Date;
    updatedAt: Date;
}