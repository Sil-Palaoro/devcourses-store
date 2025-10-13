import { CategoryService } from "@devcourses/domain";
import db from "../lib/prisma";


export const prismaCategoryServiceImplementation: CategoryService = {
    async getAll() {
        return await db.category.findMany({
            include: { courses: true }
        });
    },
    async getById(id) {
        const category = await db.category.findUnique({ 
            where: { id: id },
            include: { courses: true } 
        })
        return category ?? undefined;
    },
    async getByName(name) {
        const category = await db.category.findUnique({ 
            where: { name },
            include: { courses: true }
        });
        return category ?? undefined;
    },
}