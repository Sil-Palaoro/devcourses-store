import api from "./api";
import { Course, CourseLevel, Tag, UpdateCourseDTO, CreateCourseDTO } from "@devcourses/domain";


interface CourseService {
   getAllCourses: () => Promise<Course[] | null>
   getCourseById: (courseId: string) => Promise<Course | null>;
   createCourse: (course: CreateCourseDTO) => Promise<Course>;
   updateCourse: (payload: UpdateCourseDTO) => Promise<Course | undefined>;
   deleteCourse: (id: string) => Promise<void>;   
   getCourseByCourseLevel: (courseLevel: CourseLevel) => Promise<Course[]>;
   getCourseByTag: (tag: Tag) => Promise<Course | undefined>;
}

export const courseService: CourseService = {
     async getAllCourses() {return api.get("/courses")},
     
     async getCourseById(courseId) {return api.get(`/courses/${courseId}`)},

     async createCourse(course) {return api.post("/courses", course);},

     async updateCourse(payload) {return api.patch(`/courses/update/${payload.id}`, payload.data)},
     
     async deleteCourse(id) {return api.delete(`/courses/delete/${id}`)},

     async getCourseByCourseLevel(courseLevel) {return api.get(`/users/by-course-level/courseLevel?=${courseLevel}`)},
    
     async getCourseByTag(tag) {return api.get(`/users/by-tag/tag?=${tag}`)},

}