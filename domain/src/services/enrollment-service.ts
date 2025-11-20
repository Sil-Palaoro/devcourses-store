import { Enrollment } from "../entities/enrollment";
import { ReadOnlyService } from "../utils/types/service";

export interface EnrollmentService extends ReadOnlyService<Enrollment>{
    enrollUserInCourse: (userId: string, courseId: string) => Promise<Enrollment | undefined>;
    getEnrollMentsByUser: (userId: string) => Promise<Enrollment[]>;
    getEnrollmentsByCourse: (courseId: string) => Promise<Enrollment[]>;
    updateProgress: (enrollmentId: string, progress: number) => Promise<Enrollment | undefined>;
    markAsCompleted: (enrollmentId: string) => Promise<Enrollment | undefined>;
};