import { describe, expect, test } from "vitest";
import { getCourseList } from "./get-course-list";
import { courseService } from "../services/course-service";


describe("getCourseList", async () =>{

    test("Should return the list of courses", async () => {
        const result = await getCourseList({dependencies: {courseService}}); 
        expect(result).toStrictEqual([{
            id: "1",
            title: "Javascript para principiantes",
            description: "Aprende Javascript desde 0",
            price: 30000,
            categoryId: "1",
            courseLevel: "beginner",
            published: true,
            instructorId: "1",
            tags: ["javascript"],
            },
            {id: "2",
            title: "Python para principiantes",
            description: "Aprende Python desde 0",
            price: 30000,
            categoryId: "2",
            courseLevel: "beginner",
            published: true,
            instructorId: "1",
            tags: ["python"]
            },
            {id: "3",
            title: "SQL para principiantes",
            description: "Aprende SQL desde 0",
            price: 30000,
            categoryId: "3",
            courseLevel: "beginner",
            published: true,
            instructorId: "1",
            tags: ["sql"]
            }
        ])
    })

    test("If there is no list should return an error", async () => {
        const result = await getCourseList({dependencies: {courseService}}); 
        expect(result).toBeInstanceOf(Error)
    })
});