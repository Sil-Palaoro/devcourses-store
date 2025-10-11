import { UserService } from "../../services/user-service";
import { toSafeUserList } from "../../utils/to-safe-user";


interface GetUserList {
    dependencies: {userService: UserService};
};

export async function getUserList({dependencies}: GetUserList) {   

    const allUsers = await dependencies.userService.getAll();

    if (allUsers.length === 0) 
        return new Error("No hay ningún usuario");

    return toSafeUserList(allUsers);
};
