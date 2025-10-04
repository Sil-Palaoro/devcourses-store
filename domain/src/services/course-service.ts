import { Course } from "src/entities";
import { dataCourses } from "./mocks/course-service-mock";

export interface CourseService {
    getById: (id: string) => Promise<Course | undefined>;
};

export const courseService = {
        getById: async (id: string) => {
            return dataCourses.find((course) => course.id == id ) ;
        }
    };