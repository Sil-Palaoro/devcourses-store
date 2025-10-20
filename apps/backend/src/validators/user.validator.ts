import { z } from "zod";
import type { CreateUserDTO, UpdateUserDTO } from "@devcourses/domain";

export const createUserSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    surname: z.string().min(1, "El apellido es obligatorio"),
    email: z.email("El email debe ser válido"),
    password: z.string().min(6, "El password debe tener al menos 6 caracteres"),
    role: z.enum(["admin", "instructor", "student"]).optional().default("student"),
});

export type CreateUserSchemaType = z.infer<typeof createUserSchema>;

const _checkCreate: CreateUserDTO = {} as CreateUserSchemaType;

export const updateUserSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio").optional(),
    surname: z.string().min(1, "El apellido es obligatorio").optional(),
    email: z.email("El email debe ser válido").optional(),
    password: z.string().min(6, "El password debe tener al menos 6 caracteres").optional(),
    role: z.enum(["admin", "instructor", "student"]).optional(),
});

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;

const _checkUpdate: UpdateUserDTO["data"] = {} as UpdateUserSchemaType;
