import type { Entity } from "../utils/index.js";
import type { Category } from "./category.js";

export const CourseLevels = {
    BEGINNER: "beginner",
    INTERMEDIATE: "intermediate",
    ADVANCED: "advanced",
} as const;

export type CourseLevel = (typeof CourseLevels)[keyof typeof CourseLevels]; 

export interface Course extends Entity {
    name: string;
    description: string;
    price: number;
    category: Category["id"];
    level: CourseLevel;
    imageUrl: string;
    published: boolean;
    instructorId: Entity["id"];
};