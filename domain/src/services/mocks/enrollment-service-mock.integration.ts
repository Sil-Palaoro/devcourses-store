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
    getEnrollMentsByUser: async (userId: string) => {                        
        return mockEnrollments.filter((e: Enrollment) => (e.userId == userId));
    },
    getEnrollmentsByCourse: vi.fn(), 
    updateProgress: vi.fn(), 
    markAsCompleted: vi.fn(), 
}