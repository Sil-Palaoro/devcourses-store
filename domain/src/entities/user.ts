import type { Entity } from "../utils/types/entity"

export const UserRoles = {
    ADMIN: "admin",
    INSTRUCTOR: "instructor",
    STUDENT: "student",
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles]; 

export interface User extends Entity {
    name: string,
    surname: string,
    email: string,
    password: string,
    role: UserRole,
    // createdAt: Date;         //Commented to simplify first tests
    // updatedAt: Date;
}

export type SafeUser = Omit<User, "password">;