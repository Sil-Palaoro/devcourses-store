import { CourseService } from "../../services/course-service";


interface GetCourseList {
    dependencies: {courseService: CourseService};
};

export async function getCourseList({dependencies}: GetCourseList) {   

    const allCourses = await dependencies.courseService.getAll();

    if (allCourses.length === 0) 
        return new Error("No hay ningún curso");

    return  allCourses;
};