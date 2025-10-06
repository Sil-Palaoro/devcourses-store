import { Course } from "src/entities";
import { dataCourses } from "../../entities/mocks/course-mock";

export const courseService = {
        getById: async (id: string) => {
            return dataCourses.find((course: Course) => course.id == id );
        },
        getAll: async () => {
            return dataCourses;
        }
    };
