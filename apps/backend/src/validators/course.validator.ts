import { z } from "zod";
import type { CreateCourseDTO, UpdateCourseDTO } from "@devcourses/domain";

export const createCourseSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    price: z.number().int().positive(),
    categoryId: z.uuid().optional(),
    instructorId: z.uuid().optional(),
    published: z.boolean().default(false),
    courseLevel: z.enum(["beginner", "intermediate", "advanced"]),
    tag: z.enum(["javascript", "python", "sql"]),
});

export type CreateCourseSchemaType = z.infer<typeof createCourseSchema>;

const _checkCreate: CreateCourseDTO = {} as CreateCourseSchemaType;

export const updateCourseSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    price: z.number().int().positive().optional(),
    categoryId: z.uuid().optional(),
    instructorId: z.uuid().optional(),
    published: z.boolean().default(false).optional(),
    courseLevel: z.enum(["beginner", "intermediate", "advanced"]).optional(),
    tag: z.enum(["javascript", "python", "sql"]).optional(),
});

export type UpdateCourseSchemaType = z.infer<typeof updateCourseSchema>;

const _checkUpdate: UpdateCourseDTO["data"] = {} as UpdateCourseSchemaType;
