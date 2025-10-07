import { CourseLevel } from "../../entities/course";
import { CourseService } from "../../services/course-service";


interface GetCourseDataByLevel {
    dependencies: {courseService: CourseService};
    payload: {courseLevel: CourseLevel}
};

export async function getCoursesByLevel({dependencies, payload}: GetCourseDataByLevel) {   

    const courses = await dependencies.courseService.getByCourseLevel(payload.courseLevel)

    if (!courses) return new Error();

    return  courses;
};