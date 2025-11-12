import { CourseService } from "../../services/course-service";
import { UpdateCourseDTO } from "../../entities/course";


interface UpdateCourseData {
    dependencies: {courseService: CourseService};
    payload: UpdateCourseDTO
};

export async function updateCourse({dependencies, payload}: UpdateCourseData) {   

    const updatedCourse = await dependencies.courseService.update(payload.id, payload.data);

    if (!updatedCourse) return new Error("El curso no existe");    

    return  updatedCourse;
};