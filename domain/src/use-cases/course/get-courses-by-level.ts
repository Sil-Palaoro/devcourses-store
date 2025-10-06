import { CourseLevel } from "src/entities";
import { CourseService } from "src/services/course-service";


interface GetCourseDataByLevel {
    dependencies: {courseService: CourseService};
    payload: {courseLevel: CourseLevel}
};

export async function getCoursesByLevel({dependencies, payload}: GetCourseDataByLevel) {   

    const courses = await dependencies.courseService.getByCourseLevel(payload.courseLevel)

    if (!courses) return new Error();

    return  courses;
};