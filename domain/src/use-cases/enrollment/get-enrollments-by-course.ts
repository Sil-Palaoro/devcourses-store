import { EnrollmentService } from "../../services/enrollment-service";


interface GetEnrollmentsByCourseData {
    dependencies: { enrollmentService: EnrollmentService};
    payload: { courseId: string }
};

export async function getEnrollmentsByCourse({dependencies, payload}: GetEnrollmentsByCourseData) {   
    const { enrollmentService } = dependencies;
    const { courseId } = payload;

    const enrollments = await enrollmentService.getEnrollmentsByCourse(courseId)
    if (!enrollments) return [];

    return enrollments;
};