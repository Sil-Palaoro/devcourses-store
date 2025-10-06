import { Course, CourseLevel } from "src/entities";
import { dataCourses } from "../../entities/mocks/course-mock";

export const courseService = {
        getById: async (id: string) => {
            return dataCourses.find((course: Course) => course.id == id );
        },
        getAll: async () => {
            return dataCourses;
        },
        getByTag: async (tag: string) => {
                    let coursesByTags: Course[] = [];
                    dataCourses.map((course: Course) => {if (tag in course.tags ) {coursesByTags.push(course)}});
                    return coursesByTags;
        },
        getByCourseLevel: async (courseLevel: CourseLevel) => {
                    let coursesByLevel: Course[] = [];
                    dataCourses.map((course: Course) => {if (course.courseLevel == courseLevel) {coursesByLevel.push(course)}});
                    return coursesByLevel;
        }
    };
