import { describe, expect, test } from "vitest";
import { getCourse } from "./get-course";
import { courseService } from "../../services/mocks/course-service-mock";


describe("getCourse", async () =>{

    test("Given an id, should return the course information", async () => {
        const result = await getCourse({
            dependencies: {courseService},
            payload: {id: "1"}}
        ); 
        expect(result).toStrictEqual({
            id: "1",
            title: "Javascript para principiantes",
            description: "Aprende Javascript desde 0",
            price: 30000,
            categoryId: "1",
            courseLevel: "beginner",
            published: true,
            instructorId: "1",
            tags: ["javascript"],
        })
    })

    test("Given an invalid id, should return an error", async () => {
        const result = await getCourse({
            dependencies: {courseService},
            payload: {id: "4"}}
        ); 
        expect(result).toBeInstanceOf(Error)
    })
});