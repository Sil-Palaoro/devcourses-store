import type { Entity } from "../utils/index.js";

export const CourseLevels = {
    BEGINNER: "beginner",
    INTERMEDIATE: "intermediate",
    ADVANCED: "advanced",
} as const;

export type CourseLevel = (typeof CourseLevels)[keyof typeof CourseLevels]; 

export interface Course extends Entity {
    title: string;
    description: string;
    price: number;
    categoryId: Entity["id"];
    courseLevel: CourseLevel;
    published: boolean;
    instructorId: Entity["id"];
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
};