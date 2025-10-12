import { CourseService } from "@devcourses/domain";
import db from "../lib/prisma";


export const prismaCourseServiceImplementation: CourseService = {
    async getAll() {
        return db.course.findMany();
    },
    async getById(id) {
        const course = await db.course.findUnique({ where: { id: id } })
        return course ?? undefined;
    },
    async getByTag(tag) {
        return db.course.findMany({ where: { tag } });
    },
    async getByCourseLevel(courseLevel) {
        return db.course.findMany({ where: { courseLevel } });
    },
    async create(data) {
        await db.course.create({data});
        return;
    },
    async delete(id) {
        await db.course.delete({ where: { id: id } });
        return;
    }
}