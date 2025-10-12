import type { Entity } from "../utils/types/entity";
import { Course } from "../entities/course";

export const CategoriesNames = {
    FRONTEND: "Frontend",
    BACKEND: "Backend",
    FULLSTACK: "FullStack",
    DATABASES: "Databases",
    DEVOPSANDCLOUD: "DevOps",
    TESTINGANDQA: "Testing"
} as const;

export type CategoryName = (typeof CategoriesNames)[keyof typeof CategoriesNames]; 


export interface Category extends Entity {
    name: CategoryName;
    description: string;  
    courses: Course[];  
};