import { Course, CreateCourseDTO } from "../../entities/course";
import { CourseService } from "../../services/course-service";


//TODO: cambiar los uuid() de category e instructor ids por id reales

interface CreateCourseData {
    dependencies: {courseService: CourseService};
    payload: CreateCourseDTO
};

export async function createCourse({dependencies, payload}: CreateCourseData) { 
    const { v4: uuid } = await import("uuid");  

    const course: Course = {
        ...payload, 
        id: uuid(),
        categoryId: payload.categoryId ?? uuid(),
        instructorId: payload.instructorId ?? uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    await dependencies.courseService.create(course);
};
