import { UserService } from "../../services/user-service";
import { SafeUser } from "../../entities/user";
import toSafeUser from "../../utils/to-safe-user";


interface GetUsersDataBySurname {
    dependencies: {userService: UserService};
    payload: {surname: string}
};

export async function getUsersBySurname({dependencies, payload}: GetUsersDataBySurname) {   

    const users = await dependencies.userService.getBySurname(payload.surname)

    if (!users) return new Error();

    const usersView: SafeUser[] = users.map(toSafeUser)
    
    return usersView;
};