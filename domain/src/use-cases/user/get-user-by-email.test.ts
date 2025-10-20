import { describe, expect, test } from "vitest";
import { userServiceMock } from "../../services/mocks/user-service-mock";
import { getUserByEmail } from "./get-user-by-email";


describe("getUserByEmail", async () =>{

    test("Given an email, should return the user information", async () => {
        const result = await getUserByEmail({
            dependencies: {userService: userServiceMock},
            payload: {email: "silvi@gmail.com"}}
        ); 
        expect(result).toStrictEqual({
            id: "1",
            name: "silvina",
            surname: "Pal",
            email: "silvi@gmail.com",
            role: "admin",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        })
    })

    test("Given an invalid email, should return an error", async () => {
        const result = await getUserByEmail({
            dependencies: {userService: userServiceMock},
            payload: {email: "silvina@gmail.com"}}
        ); 
        expect(result).toBeInstanceOf(Error)
    })
});