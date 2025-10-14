import { describe, expect, test } from "vitest";
import { courseServiceMock } from "../../services/mocks/course-service-mock";
import { deleteCourse } from "./delete-course";


describe("deleteCourse", async () =>{

    test("Given an id, should delete the Course", async () => {
        const id = "6";
        await deleteCourse({
            dependencies: {courseService: courseServiceMock},
            payload: { id }}
        ); 
        expect(courseServiceMock.delete).toHaveBeenCalledTimes(1);
        expect(courseServiceMock.delete).toHaveBeenCalledWith(id);
    })
});