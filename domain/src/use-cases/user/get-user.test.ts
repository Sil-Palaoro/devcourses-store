import { describe, expect, test } from "vitest";
import { userServiceMock } from "../../services/mocks/user-service-mock.integration";
import { getUser } from "./get-user";


describe("getUser", async () =>{

    test("Given an id, should return the user information", async () => {
        const result = await getUser({
            dependencies: {userService: userServiceMock},
            payload: {id: "1"}}
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

    test("Given an invalid id, should return an error", async () => {
        const result = await getUser({
            dependencies: {userService: userServiceMock},
            payload: {id: "6"}}
        ); 
        expect(result).toBeInstanceOf(Error)
    })
});