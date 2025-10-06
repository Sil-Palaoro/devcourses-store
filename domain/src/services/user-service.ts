import { SafeUser, UserRole } from "src/entities/user";
import { Service } from "src/utils/types/service";

export interface UserService extends Service<SafeUser> {
    getByRole: (role: UserRole) => Promise<SafeUser[]>;
    getByName: (name: string) => Promise<SafeUser | undefined>;
    getBySurname: (surname: string) => Promise<SafeUser | undefined>;
    getByEmail: (email: string) => Promise<SafeUser | undefined>;
};
