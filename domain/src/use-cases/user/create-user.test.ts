import { describe, expect, test, vi } from "vitest";
import { userServiceMock } from "../../services/mocks/user-service-mock";
import { createUser } from "./create-user";
import { User } from "../../entities/user";


describe("createUser", async () =>{

    test("Given a user data, should create the user", async () => {
        const user: User = {
            id: "6",
            name: "luz",
            surname: "Mir",
            email: "luz@gmail.com",
            role: "student",
            password: "123456"
        };
        
        await createUser({
            dependencies: { userService: userServiceMock },
            payload: user,
        });

        expect(userServiceMock.create).toHaveBeenCalledTimes(1);
        expect(userServiceMock.create).toHaveBeenCalledWith(user);
    })
});
