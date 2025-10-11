import { CourseService } from "@devcourses/domain";
import db from "../lib/prisma";


export const prismaCourseServiceImplementation: CourseService = {
    async getAll() {
        return db.course.findMany();
    },
    async getById(id) {
        return db.course.findUnique({ where: { id: Number(id) } }) ?? undefined;
    },
    async getByTag(tag) {
        return db.course.findMany({ where: { tag } });
    },
    async getByCourseLevel(courseLevel) {
        return db.course.findMany({ where: { courseLevel } });
    },
}