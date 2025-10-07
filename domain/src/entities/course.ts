import type { Entity } from "../utils/types/entity";

export const CourseLevels = {
    BEGINNER: "beginner",
    INTERMEDIATE: "intermediate",
    ADVANCED: "advanced",
} as const;

export type CourseLevel = (typeof CourseLevels)[keyof typeof CourseLevels]; 

export const Tags = {
    JAVASCRIPT: "javascript",
    PYTHON: "python",
    SQL: "sql",
} as const;

export type Tag = (typeof Tags)[keyof typeof Tags]; 


export interface Course extends Entity {
    title: string;
    description: string;
    price: number;
    categoryId: Entity["id"];
    courseLevel: CourseLevel;
    published: boolean;
    instructorId: Entity["id"];
    tag: Tag;
    // createdAt: Date;
    // updatedAt: Date;
};