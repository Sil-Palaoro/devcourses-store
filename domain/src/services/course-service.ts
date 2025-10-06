import { Course } from "src/entities";

export interface CourseService {
    getById: (id: string) => Promise<Course | undefined>;
    getAll: () => Promise<Course[]>
};
