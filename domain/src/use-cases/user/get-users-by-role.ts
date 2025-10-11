import { UserRole, SafeUser } from "../../entities/user";
import { UserService } from "../../services/user-service";
import toSafeUser from "../../utils/to-safe-user";


interface GetUsersDataByRole {
    dependencies: {userService: UserService};
    payload: {role: UserRole}
};

export async function getUsersByRole({dependencies, payload}: GetUsersDataByRole) {   

    const users = await dependencies.userService.getByRole(payload.role)

    if (!users) return new Error();

    const usersView: SafeUser[] = users.map(toSafeUser)
    
    return usersView;
};