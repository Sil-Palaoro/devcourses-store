import type { Entity } from "../utils/index.js"

export interface User extends Entity {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export type SafeUser = Omit<User, "password">;