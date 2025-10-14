import { CourseService } from "@devcourses/domain";
import db from "../lib/prisma";


export const prismaCourseServiceImplementation: CourseService = {
    async getAll() {
        return await db.course.findMany();
    },
    async getById(id) {
        const course = await db.course.findUnique({ where: { id: id } })
        return course ?? undefined;
    },
    async getByTag(tag) {
        return await db.course.findMany({ where: { tag } });
    },
    async getByCourseLevel(courseLevel) {
        return await db.course.findMany({ where: { courseLevel } });
    },
    async create(data) {
        await db.course.create({data});
        return;
    },
    async update(id, data) {
        const existingCourse = await db.course.findUnique({ where: { id: id } });
        if (!existingCourse) return undefined;

        const updatedCourse = await db.course.update({ 
            where: {id: id}, 
            data
        });

        return updatedCourse;
    },
    async delete(id) {
        await db.course.delete({ where: { id: id } });
        return;
    }
}