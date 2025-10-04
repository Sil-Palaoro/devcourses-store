import { CourseService } from "src/services/course-service";


interface GetCourseData {
    dependencies: {courseService: CourseService};
    payload: {id: string}
};

export async function getCourse({dependencies, payload}: GetCourseData) {
    const course = await dependencies.courseService.getById(payload.id)
    return  course;
};