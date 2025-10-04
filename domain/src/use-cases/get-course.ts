import { Course } from "src/entities";

interface CourseService {
    getById: (id: string) => Promise<Course | undefined>;
}

interface GetCourseData {
    dependencies: {courseService: CourseService};
    payload: {id: string}
};

export async function getCourse({dependencies, payload}: GetCourseData) {
    const course = await dependencies.courseService.getById(payload.id)
    return  course;
};