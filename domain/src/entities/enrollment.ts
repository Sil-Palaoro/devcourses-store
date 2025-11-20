import type { Entity } from "../utils/types/entity";

export const EnrollementStatusOptions = {
    ACTIVE: "active",
    COMPLETED: "completed",
    CANCELLED: "cancelled"
} as const;

export type EnrollmentStatus = (typeof EnrollementStatusOptions)[keyof typeof EnrollementStatusOptions]

export interface Enrollment extends Entity {
    userId: Entity["id"];
    courseId: Entity["id"];
    enrolledAt: Date;
    progress?: number;       //porcentaje 0-100
    status: EnrollmentStatus;
    completedAt?: Date;          
}