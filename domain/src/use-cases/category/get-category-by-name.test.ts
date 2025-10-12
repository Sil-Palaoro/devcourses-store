import { describe, expect, test } from "vitest";
import { getCategoryByName } from "./get-category-by-name"
import { categoryServiceMock } from "../../services/mocks/category-service-mock";


describe("getCategoryByName", async () =>{

    test("Given a name, should return the Category information", async () => {
        const result = await getCategoryByName({
            dependencies: {categoryService: categoryServiceMock},
            payload: {name: "Frontend"}}
            ); 
        expect(result).toStrictEqual(
            {id: "1",
             name: "Frontend",
             description: "Frontend courses", 
             courses: []  
            },        
        )
    })
});