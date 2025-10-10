import { Request, Response, NextFunction } from "express";
import { getUserList } from "@devcourses/domain";
import { prismaUserServiceImplementation } from "../services/prisma-user-service-implementation"


export class UserController {
    static async getAllUsers(req: Request, res: Response) {
        try {
            const result = await getUserList({ dependencies: { userService: prismaUserServiceImplementation } });
            
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