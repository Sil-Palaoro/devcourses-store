import { UserService } from "../../services/user-service";
import { SafeUser } from "../../entities/user";
import { toSafeUser } from "../../utils/to-safe-user";


interface GetUserData {
    dependencies: {userService: UserService};
    payload: {id: string}
};

export async function getUser({dependencies, payload}: GetUserData) {   

    const user = await dependencies.userService.getById(payload.id)

    if (!user) return new Error("El usuario no existe");
    
    const userView: SafeUser = toSafeUser(user)

    return  userView;
};