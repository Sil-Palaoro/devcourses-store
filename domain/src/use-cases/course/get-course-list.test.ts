import { describe, expect, test } from "vitest";
import { getCourseList } from "./get-course-list";
import { courseServiceMock } from "../../services/mocks/course-service-mock.integration";
import { courseServiceMockUnit } from "../../services/mocks/course-service-mock.unit";


describe("getCourseList", async () =>{

    test("Should return the list of courses", async () => {
        const result = await getCourseList({dependencies: {courseService: courseServiceMock}}); 
        expect(result).toStrictEqual([    
            {id: "1",
            title: "Javascript para principiantes",
            description: "Aprende Javascript desde 0",
            price: 30000,
            categoryId: "1",
            courseLevel: "beginner",
            published: true,
            instructorId: "1",
            tag: "javascript",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            },
            {id: "2",
            title: "Python nivel intermedio",
            description: "Aprende Python nivel intermedio",
            price: 30000,
            categoryId: "2",
            courseLevel: "intermediate",
            published: true,
            instructorId: "1",
            tag: "python",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            },
            {id: "3",
            title: "SQL para principiantes",
            description: "Aprende SQL desde 0",
            price: 30000,
            categoryId: "3",
            courseLevel: "beginner",
            published: true,
            instructorId: "1",
            tag: "sql",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            }
        ])
    })

    test("If there is no list should return an empty array", async () => {
        courseServiceMockUnit.getAll.mockResolvedValueOnce([]);

        const result = await getCourseList({
            dependencies: {courseService: courseServiceMockUnit}}); 

        expect(result).toEqual([]);
        expect(Array.isArray(result)).toBe(true);
    })
});