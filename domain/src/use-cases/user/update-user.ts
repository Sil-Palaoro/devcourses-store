import { UserService } from "../../services/user-service";
import { User, SafeUser, UpdateUserDTO } from "../../entities/user";
import { toSafeUser } from "../../utils/to-safe-user";


interface UpdateUserData {
    dependencies: {userService: UserService};
    payload: UpdateUserDTO;
};

export async function updateUser({dependencies, payload}: UpdateUserData) {   

    const updatedUser = await dependencies.userService.update(payload.id, payload.data);

    if (!updatedUser) return new Error("El usuario no existe");
    
    const userView: SafeUser = toSafeUser(updatedUser)

    return  userView;
};
