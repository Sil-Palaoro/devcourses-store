import { describe, expect, test } from "vitest";
import { getCourse } from "./get-course";
import { Course } from "src/entities";

const dataCourses: Course[] = [
    {id: "1",
    title: "Javascript para principiantes",
    description: "Aprende Javascript desde 0",
    price: 30000,
    categoryId: "1",
    courseLevel: "beginner",
    published: true,
    instructorId: "1",
    tags: ["javascript"]
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
]

describe("getCourse", async () =>{

    const courseService = {
        getById: async (id: string) => {
            return dataCourses.find((course) => course.id == id ) ;
        }
    };

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

    test("Given an invalid id, should return an error", async () => {})
});