import { describe, expect, test, vi } from "vitest";
import { courseServiceMock } from "../../services/mocks/course-service-mock.integration";
import { createCourse } from "./create-course";
import { Course } from "../../entities/course";


describe("createCourse", async () =>{

    test("Given a course data, should create the course", async () => {
        const course: Course = {
            id: "4",
            title: "Javascript intermedio",
            description: "Aprende Javascript nivel intemedio",
            price: 30000,
            categoryId: "1",
            courseLevel: "intermediate",
            published: true,
            instructorId: "1",
            tag: "javascript",
        };
        
        await createCourse({
            dependencies: { courseService: courseServiceMock },
            payload: course,
        });

        expect(courseServiceMock.create).toHaveBeenCalledTimes(1);
        expect(courseServiceMock.create).toHaveBeenCalledWith(course);
    })
});
