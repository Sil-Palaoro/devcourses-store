import { CourseService } from "../../services/course-service";

interface DeleteCourseData {
    dependencies: {courseService: CourseService};
    payload: {id: string}
};

export async function deleteCourse({dependencies, payload}: DeleteCourseData) {   
    await dependencies.courseService.delete(payload.id);
};
