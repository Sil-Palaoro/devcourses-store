import { CategoryService } from "../../services/category-service";
import { CategoryName } from "../../entities/category";


interface GetCategoryDataByName {
    dependencies: {categoryService: CategoryService};
    payload: {name: CategoryName}
};

export async function getCategoryByName({dependencies, payload}: GetCategoryDataByName) {   

    const category = await dependencies.categoryService.getByName(payload.name)

    if (!category) return new Error();
    
    return category;
};