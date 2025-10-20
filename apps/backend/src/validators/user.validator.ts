import { z } from "zod";
import type { CreateUserDTO, UpdateUserDTO } from "@devcourses/domain";

export const createUserSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    surname: z.string().min(1, "El apellido es obligatorio"),
    email: z
    .email("El email debe ser válido")
    .transform((v) => v.toLowerCase().trim()),
    password: z
    .string()
    .min(6, "El password debe tener al menos 6 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
    role: z.enum(["admin", "instructor", "student"]).optional().default("student"),
});

export type CreateUserSchemaType = z.infer<typeof createUserSchema>;

const _checkCreate: CreateUserDTO = {} as CreateUserSchemaType;

export const updateUserSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio").optional(),
    surname: z.string().min(1, "El apellido es obligatorio").optional(),
    email: z
    .email("El email debe ser válido")
    .transform((v) => v.toLowerCase()
    .trim())
    .optional(),
    password: z
    .string()
    .min(6, "El password debe tener al menos 6 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .optional(),
    role: z.enum(["admin", "instructor", "student"]).optional(),
});

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;

const _checkUpdate: UpdateUserDTO["data"] = {} as UpdateUserSchemaType;


export const loginUserSchema = z.object({
    email: z
    .email("El email debe ser válido")
    .transform((v) => v.toLowerCase()
    .trim()),
    password: z
    .string()
    .min(6, "El password debe tener al menos 6 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
})
.strict();

export type LoginUserSchemaType = z.infer<typeof loginUserSchema>;
