import api from "./api";
import { Course } from "@devcourses/domain";

interface CourseService {
   getAllCourses: () => Promise<Course[] | null>
   getById: (courseId: string) => Promise<Course | null>;
   createCourse: (course: Course) => Promise<unknown>;
}

export const courseService: CourseService = {
     async getAllCourses() {
        return api.get("/courses")
     },
     
     async getById(courseId) {
        return api.get(`/courses/${courseId}`)
     },

     async createCourse(course) {
        return api.post("/courses", course);
     },
}