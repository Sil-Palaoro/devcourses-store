import { Enrollment } from "../entities/enrollment";
import { Service } from "../utils/types/service";

export interface EnrollmentService extends Service<Enrollment>{
    getEnrollMentsByUser: (userId: string) => Promise<Enrollment[]>;
    getEnrollmentsByCourse: (courseId: string) => Promise<Enrollment[]>;
    updateProgress: (enrollmentId: string, progress: number) => Promise<Enrollment | undefined>;
    markAsCompleted: (enrollmentId: string) => Promise<Enrollment | undefined>;
};