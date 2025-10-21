import { CategoryService } from "../../services/category-service";


interface GetCategoryList {
    dependencies: {categoryService: CategoryService};
};

export async function getCategoryList({dependencies}: GetCategoryList) {   

    const allcategories = await dependencies.categoryService.getAll();

    if (allcategories.length === 0) return [];
    
    return  allcategories;
};