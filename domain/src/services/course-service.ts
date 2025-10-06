import { Course, CourseLevel } from "src/entities";
import { Service } from "src/utils/types/service";

export interface CourseService extends Service<Course> {
    getByTag: (tag: string) => Promise<Course[]>;
    getByCourseLevel: (courseLevel: CourseLevel) => Promise<Course[]>
};
