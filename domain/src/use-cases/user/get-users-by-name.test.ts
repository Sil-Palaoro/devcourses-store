import { describe, expect, test } from "vitest";
import { getUsersByName } from "./get-users-by-name"
import { userServiceMock } from "../../services/mocks/user-service-mock";


describe("getUsersByName", async () =>{

    test("Should return the list of users with the same name", async () => {
        const result = await getUsersByName({
            dependencies: {userService: userServiceMock},
            payload: {name: "silvina"}}
            ); 
        expect(result).toStrictEqual([
            {id: "1",
             name: "silvina",
             surname: "Pal",
             email: "silvi@gmail.com",
             role: "admin",
             createdAt: expect.any(Date),
             updatedAt: expect.any(Date),
            }, 
            {id: "4",
             name: "silvina",
             surname: "Oro",
             email: "silvinaoro@gmail.com",
             role: "instructor",
             createdAt: expect.any(Date),
             updatedAt: expect.any(Date),
            },           
        ])
    })

    // test("Should return the list of users with role: student", async () => {
    //     const result = await getUsersByRole({
    //         dependencies: {userService},
    //         payload: {role: "student"}}
    //         ); 
    //     expect(result).toStrictEqual([
    //         {id: "2",
    //          name: "aye",
    //          surname: "Pala",
    //          email: "aye@gmail.com",
    //          role: "student",
    //         },
    //     ])
    // })

});