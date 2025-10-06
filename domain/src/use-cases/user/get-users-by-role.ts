import { UserRole } from "src/entities/user";
import { UserService } from "src/services";


interface GetUsersDataByRole {
    dependencies: {userService: UserService};
    payload: {role: UserRole}
};

export async function getUsersByRole({dependencies, payload}: GetUsersDataByRole) {   

    const users = await dependencies.userService.getByRole(payload.role)

    if (!users) return new Error();

    return  users;
};