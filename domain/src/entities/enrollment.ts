import type { Entity } from "../utils/types/entity";

export interface Enrollment extends Entity {
    userId: Entity["id"];
    courseId: Entity["id"];
    enrolledAt: Date;
    progress?: boolean;       //definir el progress
    completed?: boolean;          
}