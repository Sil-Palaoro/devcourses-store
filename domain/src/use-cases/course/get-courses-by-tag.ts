import { Tag } from "../../entities/course";
import { CourseService } from "../../services/course-service";


interface GetCourseDataByTag {
    dependencies: {courseService: CourseService};
    payload: {tag: Tag}
};

export async function getCoursesByTag({dependencies, payload}: GetCourseDataByTag) {   

    const courses = await dependencies.courseService.getByTag(payload.tag)

    if (!courses) return new Error();

    return  courses;
};