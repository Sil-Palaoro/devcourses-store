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
    createdAt: Date;        
    updatedAt: Date;
}

export type SafeUser = Omit<User, "password">;

export interface CreateUserDTO {
    name: string,
    surname: string,
    email: string,
    password: string,
    role?: UserRole,
}

export interface UpdateUserDTO {
    id: string,
    data:{
        name?: string,
        surname?: string,
        email?: string,
        role?: UserRole,
    }
}
