import { describe, test, expect, vi } from "vitest";
import { enrollUserInCourse } from "./enroll-user-in-course";
import { userServiceMock } from "../../services/mocks/user-service-mock.integration";
import { courseServiceMock } from "../../services/mocks/course-service-mock.integration";
import { enrollmentServiceMockUnit } from "../../services/mocks/enrollment-service-mock.unit";

describe("enrollUserInCourse", () => {
    test("Given userId and courseId, should create an enrollment", async () => {
        const payload = {
            userId: "1",
            courseId: "2"
        };

        vi.spyOn(userServiceMock, "getById");
        vi.spyOn(courseServiceMock, "getById");

        vi.spyOn(enrollmentServiceMockUnit, "getEnrollMentsByUser").mockResolvedValue([]);

        const result = await enrollUserInCourse({
            dependencies: {
                enrollmentService: enrollmentServiceMockUnit,
                userService: userServiceMock,
                courseService: courseServiceMock
            },
            payload: payload
        });

        expect(userServiceMock.getById).toHaveBeenCalledWith("1");
        expect(courseServiceMock.getById).toHaveBeenCalledWith("2");
        expect(enrollmentServiceMockUnit.create).toHaveBeenCalled();

        expect(result).toEqual({
            id: expect.any(String),
            userId: "1",
            courseId: "2",
            enrolledAt: expect.any(Date),
            progress: 0,
            status: "active",
        })
    })
});
