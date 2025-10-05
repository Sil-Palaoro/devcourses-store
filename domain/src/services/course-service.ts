import { Course } from "src/entities";
import { dataCourses, emptyDataCourses } from "./mocks/course-service-mock";

export interface CourseService {
    getById: (id: string) => Promise<Course | undefined>;
    getAll: () => Promise<Course[]>
};

export const courseService = {
        getById: async (id: string) => {
            return dataCourses.find((course) => course.id == id );
        },
        getAll: async () => {
            return dataCourses;
        }
    };
