import { UserService } from "../../services/user-service";
import { SafeUser } from "../../entities/user";
import { toSafeUser } from "../../utils/to-safe-user";


interface GetUserDatabyEmail {
    dependencies: {userService: UserService};
    payload: {email: string}
};

export async function getUserByEmail({dependencies, payload}: GetUserDatabyEmail) {   

    const user = await dependencies.userService.getByEmail(payload.email)

    if (!user) return new Error("El usuario no existe");

    const userView: SafeUser = toSafeUser(user)

    return  userView;
};