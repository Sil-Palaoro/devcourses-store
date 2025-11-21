import { Enrollment, EnrollmentStatus } from "../enrollment";

export const mockEnrollmentBase = {
    courseId: "1",
    userId: "1",
    progress: 0,
    enrolledAt: new Date(),
    completedAt: new Date(),
};

export const mockEnrollment: Enrollment = {
    id: "1",
    courseId: "1",
    userId: "1",
    progress: 0,
    status: "active",
    enrolledAt: new Date(),
};

export const mockEnrollments: Enrollment[] = [
{
    id: "1",
    courseId: "2",
    userId: "1",
    progress: 0,
    status: "active",
    enrolledAt: new Date(),
},
{
    id: "2",
    courseId: "3",
    userId: "1",
    progress: 0,
    status: "active",
    enrolledAt: new Date(),
},
{
    id: "3",
    courseId: "4",
    userId: "2",
    progress: 100,
    status: "completed",
    enrolledAt: new Date(),
    completedAt: new Date(),
},
{
    id: "4",
    courseId: "4",
    userId: "3",
    progress: 0,
    status: "active",
    enrolledAt: new Date(),
    completedAt: new Date(),
}
]