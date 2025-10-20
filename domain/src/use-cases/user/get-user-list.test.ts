import { describe, expect, test } from "vitest";
import { getUserList } from "./get-user-list";
import { userServiceMock } from "../../services/mocks/user-service-mock";


describe("getUserList", async () =>{

    test("Should return the list of users", async () => {
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

//De esta forma pasan los tests que piden la lista completa, pero 
// no pasa el test del error (más abajo) si la lista está vacía. Si cambio en getAll "dataCourses" por 
// emptyDataCourses, pasa el test de error, pero no pasa el que pide la lista completa. FALTA arreglar esto
//Porque no me deja poner en el test la condicion if(result.lenght === 0) porque dice que Error no tiene propiedad lenght

    // test("If there is no list should return an error", async () => {
    //     const result = await getCourseList({dependencies: {courseService}}); 
    //     expect(result).toBeInstanceOf(Error)
    // })
});