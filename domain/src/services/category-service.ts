import { Category, CategoryName } from "../entities/category";
import { Service } from "../utils/types/service";

export interface CategoryService extends Service<Category> {
    getByName: (name: CategoryName) => Promise<Category | undefined>;
};
