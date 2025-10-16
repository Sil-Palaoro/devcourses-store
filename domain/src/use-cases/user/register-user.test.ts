import { describe, expect, test, vi } from "vitest";
import { userServiceMockUnit } from "../../services/mocks/user-service-mock.unit";
import { registerUser } from "./register-user";
import { hashPassword } from "../../utils/crypto/hash-password";


vi.mock("../../utils/crypto/hash-password", () => ({
    hashPassword: vi.fn(async(p:string) => `hashed-${p}`)
}));

describe("registerUser (unit)", async () =>{

    test("Given a user data, should validate existing user, hash the password and call create-user", async () => {
        
        userServiceMockUnit.getByEmail.mockResolvedValue(undefined)         //Simula que el usuario no existia previamente
        
        const user = {
            name: "gra",
            surname: "Plat",
            email: "gra@gmail.com",
            password: "123456"
        };
        
        await registerUser({
            dependencies: { userService: userServiceMockUnit },
            payload: user,
        });

        expect(userServiceMockUnit.getByEmail).toHaveBeenCalledWith(user.email);
        expect(hashPassword).toHaveBeenCalledWith(user.password);
        expect(userServiceMockUnit.create).toHaveBeenCalledTimes(1);
        expect(userServiceMockUnit.create).toHaveBeenCalledWith(
            expect.objectContaining({
                email: user.email,
                password: "hashed-123456",
            })
        );
    });
});
