import { SafeUser, UserRole } from "src/entities";
import { dataUsers, emptyDataUsers } from "../../entities/mocks/user-mock";


export const userService = {
        getAll: async () => {
            return dataUsers;
        },
        getById: async (id: string) => {
            return dataUsers.find((user: SafeUser) => user.id == id );
        },        
        getByRole: async (role: UserRole) => {
            let usersByRole: SafeUser[] = [];
            dataUsers.map((user: SafeUser) => {if (user.role == role) {usersByRole.push(user)}});
            return usersByRole;
        },
        getByName: async (name: string) => {
            let usersByName: SafeUser[] = [];
            dataUsers.map((user: SafeUser) => {if (user.name == name) {usersByName.push(user)}});
            return usersByName;
        },
        getBySurname: async (surname: string) => {
            return dataUsers.find((user: SafeUser) => user.surname == surname);
        },
        getByEmail: async (email: string) => {
            return dataUsers.find((user: SafeUser) => user.email == email);
        }
    };
