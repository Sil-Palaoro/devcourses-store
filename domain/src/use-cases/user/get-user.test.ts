import { describe, expect, test } from "vitest";
import { userService } from "../../services/mocks/user-service-mock";
import { getUser } from "./get-user";


describe("getUser", async () =>{

    test("Given an id, should return the user information", async () => {
        const result = await getUser({
            dependencies: {userService},
            payload: {id: "1"}}
        ); 
        expect(result).toStrictEqual({
            id: "1",
            name: "silvina",
            surname: "Pal",
            email: "silvi@gmail.com",
            role: "admin",
        })
    })

    test("Given an invalid id, should return an error", async () => {
        const result = await getUser({
            dependencies: {userService},
            payload: {id: "6"}}
        ); 
        expect(result).toBeInstanceOf(Error)
    })
});