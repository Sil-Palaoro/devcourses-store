import { Request, Response } from "express";
import { getUserList, 
    createUser, 
    getUser, 
    getUsersByRole, 
    getUsersByName, 
    getUsersBySurname,
    getUserByEmail,
    deleteUser,
    updateUser,
    registerUser,
    loginUser,
    UserRole } from "@devcourses/domain";
import { prismaUserServiceImplementation } from "../services/prisma-user-service-implementation"
import { createUserSchema, updateUserSchema, loginUserSchema } from "../validators/user.validator";


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
            return res.status(400).json({ message: "El rol es requerido" });
          } 

          const validRoles: UserRole[] = ["admin", "student", "instructor"]

          if (!validRoles.includes(role as UserRole)) {
            return res.status(400).json({ message: "Valor del rol invalido"});
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
            return res.status(400).json({ message: "El nombre es requerido" });
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
            return res.status(400).json({ message: "El apellido es requerido" });
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
            return res.status(400).json({ message: "El Email es requerido" });
          }

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
            const validatedUser = createUserSchema.parse(req.body);

            await createUser({ 
                dependencies: { userService: prismaUserServiceImplementation }, 
                payload: validatedUser });
            
            return res.status(201).json({ message: "Usuario creado exitosamente"});

        } catch (error: any) {
            if (error instanceof Error && "issues" in error) {
              return res.status(400).json({
                message: "Datos inválidos",
                errors: (error as any).issues
              });
            }
            res.status(500).json({ message: error.message});
        }
    }

    
    static async updateUser(req: Request, res: Response) {
        try {
          const id = req.params.id!;
          const validatedData = updateUserSchema.parse(req.body);

          const updatedUser = await updateUser({ 
            dependencies: { userService: prismaUserServiceImplementation }, 
            payload: {
              id: id, 
              data: validatedData} 
            });

          if (updatedUser instanceof Error) {
            return res.status(404).json({ message: updatedUser.message });
          }
          res.status(200).json(updatedUser);
        } catch (error: any) {
          if (error.name === "ZodError") {
            return res.status(400).json({
              message: "Datos inválidos",
              errors: error.issues,
            })
          }

          res.status(500).json({ message: error.message });
        }
    }


    static async deleteUser(req: Request, res: Response) {
      try {
        const id = req.params.id!;
        await deleteUser({ 
          dependencies: { userService: prismaUserServiceImplementation }, 
          payload: {id: id} 
          });
        res.status(200).json({ message: "Usuario borrado exitósamente"});
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }


    static async registerUser(req: Request, res: Response) {
        try {
            const validatedUser = createUserSchema.parse(req.body);

            await registerUser({ 
                dependencies: { userService: prismaUserServiceImplementation }, 
                payload: validatedUser });

            return res.status(201).json({ message: "Usuario registrado exitosamente"});

        } catch (error: any) {
            res.status(500).json({ message: error.message});
        }
    }
    

    static async loginUser(req: Request, res: Response) {
        try {
          
            const validatedUser = loginUserSchema.parse(req.body);

            const token = await loginUser({ 
                dependencies: { userService: prismaUserServiceImplementation }, 
                payload: validatedUser });

            if (token instanceof Error) {
              return res.status(404).json({ message: token.message });
            }

            res.setHeader("Authorization", `Bearer ${token}`);
            
            return res.status(200).json({token, message: "Login exitoso"});

        } catch (error: any) {
            res.status(500).json({ message: error.message});
        }
    }
}
