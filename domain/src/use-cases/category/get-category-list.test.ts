import { describe, expect, test } from "vitest";
import { getCategoryList } from "./get-category-list";
import { categoryServiceMock } from "../../services/mocks/category-service-mock.integration";
import { categoryServiceMockUnit } from "../../services/mocks/category-service-mock.unit";


describe("getCategoryList", async () =>{

    test("Should return the list of categories", async () => {
        const result = await getCategoryList({dependencies: {categoryService: categoryServiceMock}}); 
        expect(result).toStrictEqual([ 
            {id: "1",
             name: "Frontend",
             description: "Frontend courses", 
             courses: []  
            },
            {id: "2",
             name: "Backend",
             description: "Backend courses",  
             courses: [] 
            },
            {id: "3",
             name: "FullStack",
            description: "FullStack courses", 
            courses: [], 
            },
            {id: "4",
             name: "Databases",
            description: "Databases courses",  
            courses: [],
            },
            {id: "5",
             name: "DevOps",
             description: "DevOps courses",  
             courses: [],  
            },
            {id: "6",
             name: "Testing",
             description: "Testing courses",  
             courses: [],  
            },
        ])
    })


    test("If there is no list should return an empty array", async () => {
        categoryServiceMockUnit.getAll.mockResolvedValueOnce([]);

        const result = await getCategoryList({
            dependencies: {categoryService: categoryServiceMockUnit}}); 

        expect(result).toEqual([]);
        expect(Array.isArray(result)).toBe(true);
    })
});