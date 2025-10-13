import { Request, Response, NextFunction } from "express";
import { getCategoryList, 
    getCategory, 
    getCategoryByName, 
    CategoryName,
  } from "@devcourses/domain";
import { prismaCategoryServiceImplementation } from "../services/prisma-category-service-implementation";


export class CategoryController {
    static async getAllCategories(req: Request, res: Response) {
        try {
            const result = await getCategoryList({ dependencies: { categoryService: prismaCategoryServiceImplementation } });
            
            if (result instanceof Error) {
                return res.status(404).json({ message: result.message});

            }

            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message});
        }
    }


    static async getCategoryById(req: Request, res: Response) {
        try {
          const id = req.params.id!;
          const category = await getCategory({ 
            dependencies: { categoryService: prismaCategoryServiceImplementation }, 
            payload: {id: id} 
            });

          if (category instanceof Error) {
            return res.status(404).json({ message: category.message });
          }
          res.status(200).json(category);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
    }


    static async getCategoryByName(req: Request, res: Response) {
        try {
          const { name } = req.query;

          if (!name || typeof name !== "string") {
            return res.status(400).json({ message: "Name is required" });
          } 

          const validCategoryName: CategoryName[] = ["Frontend", "Backend", "FullStack", "Databases", "DevOps", "Testing"]

          if (!validCategoryName.includes(name as CategoryName)) {
            return res.status(400).json({ message: "Invalid name value"});
          }

          const category = await getCategoryByName({ 
            dependencies: { categoryService: prismaCategoryServiceImplementation }, 
            payload: {name: name as CategoryName} 
            });

          if (category instanceof Error) {
            return res.status(404).json({ message: category.message });
          }
          res.status(200).json(category);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
    }


}

