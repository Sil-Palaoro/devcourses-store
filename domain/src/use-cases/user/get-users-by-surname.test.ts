import { describe, expect, test } from "vitest";
import { getUsersBySurname } from "./get-users-by-surname"
import { userServiceMock } from "../../services/mocks/user-service-mock";


describe("getUsersBySurname", async () =>{

    test("Should return the list of users with the same surname", async () => {
        const result = await getUsersBySurname({
            dependencies: {userService: userServiceMock},
            payload: {surname: "Pala"}}
            ); 
        expect(result).toStrictEqual([
            {id: "2",
             name: "aye",
             surname: "Pala",
             email: "aye@gmail.com",
             role: "student",
             createdAt: expect.any(Date),
             updatedAt: expect.any(Date),
            },
            {id: "5",
             name: "juli",
             surname: "Pala",
             email: "juli@gmail.com",
             role: "student",
             createdAt: expect.any(Date),
             updatedAt: expect.any(Date),
            },     
        ])
    })

});