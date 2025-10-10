import { Request, Response, NextFunction } from "express";
import { UserService } from "@devcourses/domain";
import { getUserList } from "@devcourses/domain";
import prisma from "../lib/prisma";

const prismaUserService: UserService = {
    async getAll() {
        return prisma.user.findMany();
    },
    async getById(id) {
        return prisma.user.findUnique({ where: { id: Number(id) } }) ?? undefined;
    },
    async getByRole(role) {
        return prisma.user.findMany({ where: { role } });
    },
    async getByName(name) {
        return prisma.user.findMany({ where: { name } });
    },
    async getBySurname(surname) {
        return prisma.user.findMany({ where: { surname } });
    },
    async getByEmail(email) {
        return prisma.user.findUnique({ where: { email } }) ?? undefined;
    }
}


export class UserController {
    static async getAllUsers(req: Request, res: Response) {
        try {
            const result = await getUserList({ dependencies: { userService: prismaUserService } });
            
            if (result instanceof Error) {
                return res.status(404).json({ message: result.message});

            }

            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message});
        }
    }
}


//   static async getUserById(req: Request, res: Response) {
//     try {
//       const id = Number(req.params.id);
//       const user = await getUserByIdUseCase.execute(id);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.status(200).json(user);
//     } catch (error: any) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// }