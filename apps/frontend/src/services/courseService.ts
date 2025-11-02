import api from "./api";
import { Course } from "@devcourses/domain";

interface CourseService {
    createCourse: (course: Course) => Promise<unknown>;
    getById: (courseId: string) => Promise<Course | null>;
}

export const courseService: CourseService = {
     async createCourse(course) {
        return api.post("/courses", course);
     },

     async getById(courseId) {
        return api.get(`/courses/${courseId}`)
     },
}