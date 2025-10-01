import type { Entity } from "../utils/index.js";

export interface Category extends Entity {
    name: string;
    description: string;    
};