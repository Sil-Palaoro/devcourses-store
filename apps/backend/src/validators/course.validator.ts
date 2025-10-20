import { z } from "zod";

export const createCourseSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    price: z.number().int().positive(),
    categoryId: z.string().uuid(),
    instructorId: z.string().uuid(),
    published: z.boolean().default(false),
    courseLevel: z.enum(["beginner", "intermediate", "advanced"]),
    tag: z.enum(["javascript", "python", "sql"]),
});

export type CreateCourseDTO = z.infer<typeof createCourseSchema>;