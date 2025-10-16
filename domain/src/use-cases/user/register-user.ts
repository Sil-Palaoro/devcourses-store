import { UserService } from "../../services/user-service";
import { createUser } from "./create-user";
import { hashPassword } from "../../utils/crypto/hash-password";
import { v4 as uuid } from "uuid";

interface RegisterUserData {
    dependencies: { userService: UserService},
    payload: {
        name: string; 
        email: string; 
        password: string; 
        surname: string
    }
} 

export async function registerUser({ dependencies, payload }: RegisterUserData) {
    const existingUser = await dependencies.userService.getByEmail(payload.email);

    if(existingUser) new Error("El usuario ya existe");

    const hashed = await hashPassword(payload.password);

    const newUser = {
        id: uuid(),
        ...payload,
        password: hashed,
        role: "student" as const,
    };

    await createUser({ dependencies, payload: newUser});
    return { message: "Usuario registrado exitósamente."}
}