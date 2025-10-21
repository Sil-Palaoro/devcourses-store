import { User, CreateUserDTO } from "../../entities/user";
import { UserService } from "../../services/user-service";
import { hashPassword } from "../../utils/crypto/hash-password";


interface CreateUserData {
    dependencies: {userService: UserService};
    payload: CreateUserDTO
};

export async function createUser({dependencies, payload}: CreateUserData) {   
    const { v4: uuid } = await import("uuid");

    const hashed = await hashPassword(payload.password);
    

    const user: User = {
        ...payload,
        id: uuid(),
        password: hashed,
        role: payload.role ?? "student",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    
    await dependencies.userService.create(user);
};
