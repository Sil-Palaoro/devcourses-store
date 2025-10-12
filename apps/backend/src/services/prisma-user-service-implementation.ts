import { UserService } from "@devcourses/domain";
import db from "../lib/prisma";


export const prismaUserServiceImplementation: UserService = {
    async getAll() {
        return db.user.findMany();
    },
    async getById(id) {
        const user = await db.user.findUnique({ where: { id: id } })
        return user ?? undefined;
    },
    async getByRole(role) {
        return db.user.findMany({ where: { role } });
    },
    async getByName(name) {
        return db.user.findMany({ where: { name } });
    },
    async getBySurname(surname) {
        return db.user.findMany({ where: { surname } });
    },
    async getByEmail(email) {
        const user = await db.user.findUnique({ where: { email } })
        return user ?? undefined;
    },
    async create(data) {
        await db.user.create({data});
        return;
    },
    async delete(id) {
        await db.user.delete({ where: { id: id } });
        return;
    }
}