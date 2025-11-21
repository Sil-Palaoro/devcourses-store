import { EnrollmentStatus } from "../../entities/enrollment";
import { EnrollmentService } from "../../services/enrollment-service";
import { UserService } from "../../services/user-service";
import { CourseService } from "../../services/course-service";

interface EnrollUserInCourseData {
    dependencies: {
        enrollmentService: EnrollmentService,
        userService: UserService,
        courseService: CourseService
    },
    payload: {
        userId: string,
        courseId: string
    }
}

export async function enrollUserInCourse({ dependencies, payload }: EnrollUserInCourseData) {
    const { enrollmentService, userService, courseService } = dependencies;
    const { userId, courseId } = payload;
    const { v4: uuid } = await import("uuid");

    const user = await userService.getById(userId);
    if (!user) return new Error("El usuario no existe");

    const course = await courseService.getById(courseId);
    if (!course) return new Error("El curso no existe");

    const previousEnrollment = await enrollmentService.getEnrollMentsByUser(userId);
    
    if (previousEnrollment.find((e) => e.courseId === courseId)) {
        return new Error("El usuario ya está inscripto");
    };

    const newEnrollment = {
        id: uuid(),
        userId,
        courseId,
        enrolledAt: new Date(),
        progress: 0,
        status: "active" as EnrollmentStatus,
    };
    
    await enrollmentService.create(newEnrollment);

    return newEnrollment;
};