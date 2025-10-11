import { User } from "../../entities/user";
import { UserService } from "../../services/user-service";

interface CreateUserData {
    dependencies: {userService: UserService};
    payload: {user: User}
};

export async function createUser({dependencies, payload}: CreateUserData) {   
    await dependencies.userService.create(payload.user);
};
