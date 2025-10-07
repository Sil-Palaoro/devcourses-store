import { Course, CourseLevel, Tag } from "../entities/course";
import { Service } from "../utils/types/service";

export interface CourseService extends Service<Course> {
    getByTag: (tag: Tag) => Promise<Course[]>;
    getByCourseLevel: (courseLevel: CourseLevel) => Promise<Course[]>
};
