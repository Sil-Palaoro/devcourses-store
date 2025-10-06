import { describe, expect, test } from "vitest";
import { getUsersByRole } from "./get-users-by-role"
import { userService } from "../../services/mocks/user-service-mock";


describe("getUsersByRole", async () =>{

    test("Should return the list of users with role: admin", async () => {
        const result = await getUsersByRole({
            dependencies: {userService},
            payload: {role: "admin"}}
            ); 
        expect(result).toStrictEqual([
            {id: "1",
             name: "silvina",
             surname: "Pal",
             email: "silvi@gmail.com",
             role: "admin",
            },            
        ])
    })

    test("Should return the list of users with role: student", async () => {
        const result = await getUsersByRole({
            dependencies: {userService},
            payload: {role: "student"}}
            ); 
        expect(result).toStrictEqual([
            {id: "2",
             name: "aye",
             surname: "Pala",
             email: "aye@gmail.com",
             role: "student",
            },
            {id: "5",
             name: "juli",
             surname: "Pala",
             email: "juli@gmail.com",
             role: "student",
            },
        ])
    })

});