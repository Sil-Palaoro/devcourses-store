import { Request, Response } from "express";
import { getUserList, 
    createUser, 
    getUser, 
    getUsersByRole, 
    getUsersByName, 
    getUsersBySurname,
    getUserByEmail,
    UserRole } from "@devcourses/domain";
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
          const { role } = req.query;

          if (!role || typeof role !== "string") {
            return res.status(400).json({ message: "Role is required" });
          } 

          const validRoles: UserRole[] = ["admin", "student", "instructor"]

          if (!validRoles.includes(role as UserRole)) {
            return res.status(400).json({ message: "Invalid role value"});
          }

          const users = await getUsersByRole({ 
            dependencies: { userService: prismaUserServiceImplementation }, 
            payload: {role: role as UserRole} 
            });

          if (users instanceof Error) {
            return res.status(404).json({ message: users.message });
          }
          res.status(200).json(users);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
    }


    static async getByName(req: Request, res: Response) {
        try {
          const { name } = req.query;

          if (!name || typeof name !== "string") {
            return res.status(400).json({ message: "Name is required" });
          } 


          const user = await getUsersByName({ 
            dependencies: { userService: prismaUserServiceImplementation }, 
            payload: {name: name} 
            });

          if (user instanceof Error) {
            return res.status(404).json({ message: user.message });
          }
          res.status(200).json(user);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
    }


    static async getBySurname(req: Request, res: Response) {
        try {
          const { surname } = req.query;

          if (!surname || typeof surname !== "string") {
            return res.status(400).json({ message: "Surname is required" });
          } 

          const user = await getUsersBySurname({ 
            dependencies: { userService: prismaUserServiceImplementation }, 
            payload: {surname: surname} 
            });

          if (user instanceof Error) {
            return res.status(404).json({ message: user.message });
          }
          res.status(200).json(user);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
    }


    static async getByEmail(req: Request, res: Response) {
        try {
          const { email } = req.query;

          if(!email ||typeof email!== "string") {
            return res.status(400).json({ message: "Email is required" });
          }

          console.log("Email recibido", email)

          const user = await getUserByEmail({ 
            dependencies: { userService: prismaUserServiceImplementation }, 
            payload: {email: email} 
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
