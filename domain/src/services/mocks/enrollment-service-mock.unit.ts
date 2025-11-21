import { vi } from "vitest";
import { EnrollmentService } from "../enrollment-service";

export const enrollmentServiceMockUnit: EnrollmentService = {
    getAll: vi.fn(),
    getById: vi.fn(), 
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),    
    // enrollUserInCourse: vi.fn(), 
    getEnrollMentsByUser: vi.fn(), 
    getEnrollmentsByCourse: vi.fn(), 
    updateProgress: vi.fn(), 
    markAsCompleted: vi.fn(), 
}