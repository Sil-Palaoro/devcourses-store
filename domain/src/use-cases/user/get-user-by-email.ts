import { UserService } from "../../services/user-service";


interface GetUserDatabyEmail {
    dependencies: {userService: UserService};
    payload: {email: string}
};

export async function getUserByEmail({dependencies, payload}: GetUserDatabyEmail) {   

    const user = await dependencies.userService.getByEmail(payload.email)

    if (!user) return new Error("El usuario no existe");

    return  user;
};