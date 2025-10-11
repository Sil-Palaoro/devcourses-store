import { User } from "../../entities/user";
import { UserService } from "../../services/user-service";

interface DeleteUserData {
    dependencies: {userService: UserService};
    payload: {id: string}
};

export async function deleteUser({dependencies, payload}: DeleteUserData) {   
    await dependencies.userService.delete(payload.id);
};
