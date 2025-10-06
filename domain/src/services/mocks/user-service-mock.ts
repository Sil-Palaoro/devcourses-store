import { SafeUser } from "src/entities";
import { dataUsers, emptyDataUsers } from "../../entities/mocks/user-mock";


export const userService = {
        getById: async (id: string) => {
            return dataUsers.find((user: SafeUser) => user.id == id );
        },
        getAll: async () => {
            return dataUsers;
        }
    };
