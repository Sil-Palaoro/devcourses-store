import { User, UserRole } from "../entities/user";
import { Service } from "../utils/types/service";

export interface UserService extends Service<User> {
    getByRole: (role: UserRole) => Promise<User[]>;
    getByName: (name: string) => Promise<User[]>;
    getBySurname: (surname: string) => Promise<User[]>;
    getByEmail: (email: string) => Promise<User | undefined>;
};
