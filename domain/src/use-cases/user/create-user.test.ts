import { describe, expect, test, vi } from "vitest";
import { userServiceMock } from "../../services/mocks/user-service-mock.integration";
import { createUser } from "./create-user";
import { CreateUserDTO } from "../../entities/user";

vi.mock("../../utils/crypto/hash-password", () => ({
    hashPassword: vi.fn(async(p:string) => `hashed-${p}`)
}));


describe("createUser", async () =>{

    test("Given a user data, should create the user", async () => {
        const user: CreateUserDTO = {
            name: "luz",
            surname: "Mir",
            email: "luz@gmail.com",
            password: "123456"
        };
        
        await createUser({
            dependencies: { userService: userServiceMock },
            payload: user,
        });

        expect(userServiceMock.create).toHaveBeenCalledTimes(1);
        expect(userServiceMock.create).toHaveBeenCalledWith(
            expect.objectContaining({
                name: "luz",
                surname: "Mir",
                email: "luz@gmail.com",
                role: "student",
                password: "hashed-123456",
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            })
        );
    })
});
