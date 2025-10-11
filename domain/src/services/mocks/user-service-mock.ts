import { SafeUser, User, UserRole } from "../../entities/user";
import { dataCompleteUsers } from "../../entities/mocks/user-mock";
import { vi } from "vitest";

export const userServiceMock = {
        getAll: async () => dataCompleteUsers,
        getById: async (id: string) => dataCompleteUsers.find((u) => u.id == id ),        
        getByRole: async (role: UserRole) =>
            dataCompleteUsers.filter((u) => (u.role === role)),
        getByName: async (name: string) =>
            dataCompleteUsers.filter((u) => (u.name === name)),
        getBySurname: async (surname: string) =>
            dataCompleteUsers.filter((u) => (u.surname === surname)),
        getByEmail: async (email: string) => 
            dataCompleteUsers.find((u) => u.email == email),
        create: vi.fn(async (user:User) => {
            if (user) dataCompleteUsers.push(user); 
        }),
    };
