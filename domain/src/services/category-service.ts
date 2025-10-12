import { Category, CategoryName } from "../entities/category";
import { ReadOnlyService } from "../utils/types/service";

export interface CategoryService extends ReadOnlyService<Category> {
    getByName: (name: CategoryName) => Promise<Category | undefined>;
};
