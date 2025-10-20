import { User, CreateUserDTO } from "../../entities/user";
import { UserService } from "../../services/user-service";

interface CreateUserData {
    dependencies: {userService: UserService};
    payload: CreateUserDTO
};

export async function createUser({dependencies, payload}: CreateUserData) {   
    const { v4: uuid } = await import("uuid");

    const user: User = {
        ...payload,
        id: uuid(),
        role: payload.role ?? "student",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    
    await dependencies.userService.create(user);
};
