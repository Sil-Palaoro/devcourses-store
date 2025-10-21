import { UserService } from "../../services/user-service";
import { createUser } from "./create-user";
import { hashPassword } from "../../utils/crypto/hash-password";
import { CreateUserDTO } from "../../entities/user";

interface RegisterUserData {
    dependencies: { userService: UserService},
    payload: CreateUserDTO,
} 

export async function registerUser({ dependencies, payload }: RegisterUserData) {    
    const existingUser = await dependencies.userService.getByEmail(payload.email);

    if(existingUser) throw new Error("El usuario ya existe");

    await createUser({ dependencies, payload: payload});
    return { message: "Usuario registrado exitósamente."}
}