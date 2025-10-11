import { UserService } from "../../services/user-service";
import { SafeUser } from "../../entities/user";
import toSafeUser from "../../utils/to-safe-user";


interface GetUsersDataByName {
    dependencies: {userService: UserService};
    payload: {name: string}
};

export async function getUsersByName({dependencies, payload}: GetUsersDataByName) {   

    const users = await dependencies.userService.getByName(payload.name)

    if (!users) return new Error();

    const usersView: SafeUser[] = users.map(toSafeUser)
    
    return usersView;
};