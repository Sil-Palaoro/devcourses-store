import type { Entity } from "../utils/types/entity";

export const CategoriesNames = {
    FRONTEND: "Frontend",
    BACKEND: "Backend",
    FULLSTACK: "Full-Stack",
    DATABASES: "Databases",
    DEVOPS: "DevOps & Cloud",
    TESTING: "Testing & QA"
} as const;

export type CategoryName = (typeof CategoriesNames)[keyof typeof CategoriesNames]; 


export interface Category extends Entity {
    name: CategoryName;
    description: string;    
};