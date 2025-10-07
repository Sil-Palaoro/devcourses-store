import { UserService } from "../../services/user-service";


interface GetUsersDataByName {
    dependencies: {userService: UserService};
    payload: {name: string}
};

export async function getUsersByName({dependencies, payload}: GetUsersDataByName) {   

    const users = await dependencies.userService.getByName(payload.name)

    if (!users) return new Error();

    return  users;
};