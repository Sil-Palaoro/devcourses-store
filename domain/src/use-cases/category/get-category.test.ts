import { describe, expect, test } from "vitest";
import { getCategory } from "./get-category";
import { categoryServiceMock } from "../../services/mocks/category-service-mock";


describe("getCategory", async () =>{

    test("Given an id, should return the category information", async () => {
        const result = await getCategory({
            dependencies: {categoryService: categoryServiceMock},
            payload: {id: "1"}}
        ); 
        expect(result).toStrictEqual({
            id: "1",
            name: "Frontend",
            description: "Frontend courses", 
            courses: []  
            }
        )
    })

    test("Given an invalid id, should return an error", async () => {
        const result = await getCategory({
            dependencies: {categoryService: categoryServiceMock},
            payload: {id: "7"}}
        ); 
        expect(result).toBeInstanceOf(Error)
    })
});