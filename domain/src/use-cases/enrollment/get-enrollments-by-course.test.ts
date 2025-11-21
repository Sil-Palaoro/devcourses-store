import { describe, expect, test } from "vitest";
import { getEnrollmentsByCourse } from "./get-enrollments-by-course";
import { enrollmentServiceMockIntegration } from "../../services/mocks/enrollment-service-mock.integration";


describe("getEnrollmentsByCourse", async () =>{

    test("Given a courseId, should return the list of Enrollments", async () => {
        const result = await getEnrollmentsByCourse({
            dependencies: { enrollmentService: enrollmentServiceMockIntegration },
            payload: { courseId: "4"}}
            ); 

        expect(result).toStrictEqual([
            {
                id: "3",
                courseId: "4",
                userId: "2",
                progress: 100,
                status: "completed",
                enrolledAt: expect.any(Date),
                completedAt: expect.any(Date),
            },
            {
                id: "4",
                courseId: "4",
                userId: "3",
                progress: 0,
                status: "active",
                enrolledAt: expect.any(Date),
                completedAt: expect.any(Date),
            }
        ])
    })

    test("Given a courseId without enrollments, should return an empty list", async () => {
        const result = await getEnrollmentsByCourse({
            dependencies: { enrollmentService: enrollmentServiceMockIntegration },
            payload: { courseId: "99"}}
            ); 

        expect(result).toStrictEqual([])
    })
});