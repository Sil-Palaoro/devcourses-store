import { SafeUser } from "src/entities/user";

export interface UserService {
    getById: (id: string) => Promise<SafeUser | undefined>;
    getAll: () => Promise<SafeUser[]>
};
