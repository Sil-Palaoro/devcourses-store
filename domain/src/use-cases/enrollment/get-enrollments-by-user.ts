import { EnrollmentService } from "../../services/enrollment-service";


interface GetEnrollmentsByUserData {
    dependencies: { enrollmentService: EnrollmentService};
    payload: { userId: string }
};

export async function getEnrollmentsByUser({dependencies, payload}: GetEnrollmentsByUserData) {   
    const { enrollmentService } = dependencies;
    const { userId } = payload;

    const enrollments = await enrollmentService.getEnrollMentsByUser(userId)
    if (!enrollments) return [];

    return enrollments;
};