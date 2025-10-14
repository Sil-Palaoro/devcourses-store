import { describe, expect, test } from "vitest";
import { userServiceMock } from "../../services/mocks/user-service-mock";
import { updateUser } from "./update-user";


describe("updateUser", async () =>{

    test("Given an id and the partial data to update, should return the user updated", async () => {
        const result = await updateUser({
            dependencies: {userService: userServiceMock},
            payload: {id: "1",
                data: {
                    surname: "Pala"
                }
            },
            }
        ); 
        expect(result).toStrictEqual({
            id: "1",
            name: "silvina",
            surname: "Pala",
            email: "silvi@gmail.com",
            role: "admin",
        })
    })

    test("Given an invalid id, should return an error", async () => {
        const result = await updateUser({
            dependencies: {userService: userServiceMock},
            payload: {id: "6",
                data: {}
            }}
        ); 
        expect(result).toBeInstanceOf(Error)
    })
});