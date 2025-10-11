import { Course, CourseLevel, Tag } from "../../entities/course";
import { dataCourses } from "../../entities/mocks/course-mock";
import { vi } from "vitest";

export const courseServiceMock = {
        getById: async (id: string) => {
            return dataCourses.find((course: Course) => course.id == id );
        },
        getAll: async () => {
            return dataCourses;
        },
        getByTag: async (tag: Tag) => {
                    let coursesByTags: Course[] = [];
                    dataCourses.map((course: Course) => {if (course.tag == tag) {coursesByTags.push(course)}});
                    return coursesByTags;
        },
        getByCourseLevel: async (courseLevel: CourseLevel) => {
                    let coursesByLevel: Course[] = [];
                    dataCourses.map((course: Course) => {if (course.courseLevel == courseLevel) {coursesByLevel.push(course)}});
                    return coursesByLevel;
        },
        create: vi.fn(async (course:Course) => {
            if (course) dataCourses.push(course); 
        }),
        delete: vi.fn(async (id: string) => {
            const index = dataCourses.findIndex((u) => u.id === id);
            if (index !== -1) dataCourses.splice(index, 1);
        }),
    };
