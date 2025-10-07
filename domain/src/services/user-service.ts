import { SafeUser, User, UserRole } from "../entities/user";
import { Service } from "../utils/types/service";

export interface UserService extends Service<SafeUser> {
    getByRole: (role: UserRole) => Promise<SafeUser[]>;
    getByName: (name: string) => Promise<SafeUser[]>;
    getBySurname: (surname: string) => Promise<SafeUser[]>;
    getByEmail: (email: string) => Promise<SafeUser | undefined>;
};
