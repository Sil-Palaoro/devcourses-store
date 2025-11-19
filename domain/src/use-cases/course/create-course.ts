import { Course, CreateCourseDTO } from "../../entities/course";
import { CourseService } from "../../services/course-service";


interface CreateCourseData {
    dependencies: {courseService: CourseService};
    payload: CreateCourseDTO
};

export async function createCourse({dependencies, payload}: CreateCourseData) { 
    const { v4: uuid } = await import("uuid");  

    const course: Course = {
        ...payload, 
        id: uuid(),
        categoryId: payload.categoryId ?? "4d6d7a53-a691-4015-a59f-4e134daf04da",      //id de Category "Fullstack" por default"
        instructorId: payload.instructorId ?? "d42e721f-c383-466c-9048-daafa95e8d74",  //id de user "Olivia" con role "instructor"
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    await dependencies.courseService.create(course);
};
