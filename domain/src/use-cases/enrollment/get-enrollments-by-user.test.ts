import { describe, expect, test } from "vitest";
import { getEnrollmentsByUser } from "./get-enrollments-by-user";
import { enrollmentServiceMockIntegration } from "../../services/mocks/enrollment-service-mock.integration";


describe("getEnrollmentsByUser", async () =>{

    test("Given an userId, should return the list of Enrollments", async () => {
        const result = await getEnrollmentsByUser({
            dependencies: { enrollmentService: enrollmentServiceMockIntegration },
            payload: { userId: "1"}}
            ); 

        expect(result).toStrictEqual([
            {
                id: "1",
                courseId: "2",
                userId: "1",
                progress: 0,
                status: "active",
                enrolledAt: expect.any(Date),
            },
            {
                id: "2",
                courseId: "3",
                userId: "1",
                progress: 0,
                status: "active",
                enrolledAt: expect.any(Date),
            },
        ])
    })
});