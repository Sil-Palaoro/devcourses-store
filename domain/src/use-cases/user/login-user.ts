import { UserService } from "../../services/user-service";
import { comparePasswords } from "../../utils/crypto/compare-passwords";
import { generateToken } from "../../utils/crypto/generate-jwt";


interface LoginUserData {
    dependencies: { userService: UserService},
    payload: {
        email: string; 
        password: string; 
    }
} 

export async function loginUser({ dependencies, payload }: LoginUserData) {
    const existingUser = await dependencies.userService.getByEmail(payload.email);

    if(!existingUser) {
        return new Error("El usuario no existe");
    };

    const comparePasswordResult = await comparePasswords(payload.password, existingUser.password);

    if(!comparePasswordResult) {        
        return new Error("Contraseña incorrecta");
    }

    const generatedToken = generateToken({
        id: existingUser.id, 
        role: existingUser.role}
    );        
    
    return generatedToken;
}