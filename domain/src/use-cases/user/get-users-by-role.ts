import { UserRole } from "../../entities/user";
import { UserService } from "../../services/user-service";


interface GetUsersDataByRole {
    dependencies: {userService: UserService};
    payload: {role: UserRole}
};

export async function getUsersByRole({dependencies, payload}: GetUsersDataByRole) {   

    const users = await dependencies.userService.getByRole(payload.role)

    if (!users) return new Error();

    return  users;
};