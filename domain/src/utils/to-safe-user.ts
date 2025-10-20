import { User, SafeUser } from "../entities/user";

export function toSafeUser(user:User): SafeUser {
    const {id, name, surname, email, role, createdAt, updatedAt} = user;
    return {id, name, surname, email, role, createdAt, updatedAt};
}

export function toSafeUserList(users: User[]): SafeUser[] {
    return users.map(toSafeUser);
}
