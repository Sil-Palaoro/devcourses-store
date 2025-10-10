import { UserService } from "@devcourses/domain";
import db from "../lib/prisma";


export const prismaUserServiceImplementation: UserService = {
    async getAll() {
        return db.user.findMany();
    },
    async getById(id) {
        return db.user.findUnique({ where: { id: Number(id) } }) ?? undefined;
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
        return db.user.findUnique({ where: { email } }) ?? undefined;
    }
}