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
        categoryId: payload.categoryId ?? "cmgpmtr780002tiocm5oeixp0",      //id de Category "Fullstack" por default"
        instructorId: payload.instructorId ?? "cmgqh46pm0000tidovn73ptd5",  //id de user "Olivia" con role "instructor"
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    await dependencies.courseService.create(course);
};
