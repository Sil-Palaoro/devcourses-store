import { Request, Response } from "express";
import { getUserList, createUser, getUser, getUsersByRole } from "@devcourses/domain";
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

    static async getUserById(req: Request, res: Response) {
        try {
          const id = req.params.id!;
          const user = await getUser({ 
            dependencies: { userService: prismaUserServiceImplementation }, 
            payload: {id: id} 
            });

          if (user instanceof Error) {
            return res.status(404).json({ message: user.message });
          }
          res.status(200).json(user);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
    }

    static async getByRole(req: Request, res: Response) {
        try {
          const role = req.body;
          const user = await getUsersByRole({ 
            dependencies: { userService: prismaUserServiceImplementation }, 
            payload: {role: role} 
            });

          if (user instanceof Error) {
            return res.status(404).json({ message: user.message });
          }
          res.status(200).json(user);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
    }


    static async createUser(req: Request, res: Response) {
        try {
            const user = req.body;
            await createUser({ 
                dependencies: { userService: prismaUserServiceImplementation }, 
                payload: user });
            
            return res.status(201).json({ message: "User created successfully"});

        } catch (error: any) {
            res.status(500).json({ message: error.message});
        }
    }
}
