import { SafeUser } from "src/entities/user";
import { dataUsers, emptyDataUsers } from "./mocks/user-service-mock";

export interface UserService {
    getById: (id: string) => Promise<SafeUser | undefined>;
    getAll: () => Promise<SafeUser[]>
};

export const userService = {
        getById: async (id: string) => {
            return dataUsers.find((user) => user.id == id );
        },
        getAll: async () => {
            return dataUsers;
        }
    };
