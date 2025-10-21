import { describe, expect, test } from "vitest";
import { getUserList } from "./get-user-list";
import { userServiceMock } from "../../services/mocks/user-service-mock.integration";
import { userServiceMockUnit } from "../../services/mocks/user-service-mock.unit";


describe("getUserList", async () =>{

    test("Should return the list of users when there are users", async () => {
        const result = await getUserList({dependencies: {userService: userServiceMock}}); 
        expect(result).toStrictEqual([    
            {id: "1",
             name: "silvina",
             surname: "Pal",
             email: "silvi@gmail.com",
             role: "admin",
             createdAt: expect.any(Date),
             updatedAt: expect.any(Date),
            },
            {id: "2",
             name: "aye",
             surname: "Pala",
             email: "aye@gmail.com",
             role: "student",
             createdAt: expect.any(Date),
             updatedAt: expect.any(Date),
            },
            {id: "3",
             name: "olivia",
             surname: "Dea",
             email: "oli@gmail.com",
             role: "instructor",
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

    test("If there is no list should return an empty array", async () => {
        userServiceMockUnit.getAll.mockResolvedValueOnce([]);

        const result = await getUserList({
            dependencies: {userService: userServiceMockUnit}}); 

        expect(result).toEqual([]);
        expect(Array.isArray(result)).toBe(true);
    })
});