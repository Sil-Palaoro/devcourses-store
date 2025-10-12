import { CategoryService } from "../../services/category-service";


interface GetCategoryData {
    dependencies: {categoryService: CategoryService};
    payload: {id: string}
};

export async function getCategory({dependencies, payload}: GetCategoryData) {   

    const category = await dependencies.categoryService.getById(payload.id)

    if (!category) return new Error();

    return  category;
};