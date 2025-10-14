import { describe, expect, test } from "vitest";
import { courseServiceMock } from "../../services/mocks/course-service-mock";
import { updateCourse } from "./update-course";


describe("updateCourse", async () =>{

    test("Given an id and the partial data to update, should return the Course updated", async () => {
        const result = await updateCourse({
            dependencies: {courseService: courseServiceMock},
            payload: {id: "3",
                data: {
                    published: false
                }
            },
            }
        ); 
        expect(result).toStrictEqual(    {id: "3",
            title: "SQL para principiantes",
            description: "Aprende SQL desde 0",
            price: 30000,
            categoryId: "3",
            courseLevel: "beginner",
            published: false,
            instructorId: "1",
            tag: "sql"
        })
    })

    test("Given an invalid id, should return an error", async () => {
        const result = await updateCourse({
            dependencies: {courseService: courseServiceMock},
            payload: {id: "6",
                data: {}
            }}
        ); 
        expect(result).toBeInstanceOf(Error)
    })
});