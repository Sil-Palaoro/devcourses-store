import { CourseService } from "../../services/course-service";


interface GetCourseData {
    dependencies: {courseService: CourseService};
    payload: {id: string}
};

export async function getCourse({dependencies, payload}: GetCourseData) {   

    const course = await dependencies.courseService.getById(payload.id)

    if (!course) return new Error();

    return  course;
};