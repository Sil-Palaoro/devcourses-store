import { UserService } from "src/services/user-service";


interface GetUserList {
    dependencies: {userService: UserService};
};

export async function getUserList({dependencies}: GetUserList) {   

    const allUsers = await dependencies.userService.getAll();

    if (allUsers.length === 0) 
        return new Error("No hay ningún curso");

    return allUsers;
};