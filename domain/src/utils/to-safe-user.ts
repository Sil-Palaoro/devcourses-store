import { User, SafeUser } from "../entities/user";

export default function toSafeUser(user:User): SafeUser {
    const {id, name, surname, email, role} = user;
    return {id, name, surname, email, role};
}
