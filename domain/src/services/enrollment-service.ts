import { Enrollment } from "../entities/enrollment";
import { Service } from "../utils/types/service";

export interface EnrollmentService extends Service<Enrollment>{
    enrollUserInCourse: (userId: string, courseId: string) => Promise<Enrollment | undefined>;
};