import { Course, CourseLevel, Tag } from "src/entities";
import { Service } from "src/utils/types/service";

export interface CourseService extends Service<Course> {
    getByTag: (tag: Tag) => Promise<Course[]>;
    getByCourseLevel: (courseLevel: CourseLevel) => Promise<Course[]>
};
