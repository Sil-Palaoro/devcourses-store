import { vi } from "vitest";
import { EnrollmentService } from "../enrollment-service";
import { Enrollment } from "../../entities/enrollment";
import { mockEnrollments } from "../../entities/mocks/enrollment-mock";

export const enrollmentServiceMockIntegration: EnrollmentService = {
    getAll: vi.fn(),
    getById: vi.fn(), 
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),    
    getEnrollmentsByUser: async (userId: string) => {                        
        return mockEnrollments.filter((e: Enrollment) => (e.userId == userId));
    },
    getEnrollmentsByCourse: async (courseId: string) => {                        
        return mockEnrollments.filter((e: Enrollment) => (e.courseId == courseId));
    },
    updateProgress: vi.fn(), 
    markAsCompleted: vi.fn(), 
}