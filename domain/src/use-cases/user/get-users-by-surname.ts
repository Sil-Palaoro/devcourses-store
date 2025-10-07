import { UserService } from "../../services/user-service";


interface GetUsersDataBySurname {
    dependencies: {userService: UserService};
    payload: {surname: string}
};

export async function getUsersBySurname({dependencies, payload}: GetUsersDataBySurname) {   

    const users = await dependencies.userService.getBySurname(payload.surname)

    if (!users) return new Error();

    return  users;
};