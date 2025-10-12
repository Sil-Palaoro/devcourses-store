import { Course } from "../../entities/course";
import { CourseService } from "../../services/course-service";

interface CreateCourseData {
    dependencies: {courseService: CourseService};
    payload: Course
};

export async function createCourse({dependencies, payload}: CreateCourseData) {   
    await dependencies.courseService.create(payload);
};
