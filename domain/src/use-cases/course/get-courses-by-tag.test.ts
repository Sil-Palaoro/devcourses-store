import { describe, expect, test } from "vitest";
import { getCoursesByTag } from "./get-courses-by-tag"
import { courseServiceMock } from "../../services/mocks/course-service-mock.integration";


describe("getCoursesByTag", async () =>{

    test("Should return the list of courses with the same tag: javascript", async () => {
        const result = await getCoursesByTag({
            dependencies: {courseService: courseServiceMock},
            payload: {tag: "javascript"}}
            ); 
        expect(result).toStrictEqual([
            {id: "1",
            title: "Javascript para principiantes",
            description: "Aprende Javascript desde 0",
            price: 30000,
            categoryId: "1",
            courseLevel: "beginner",
            published: true,
            instructorId: "1",
            tag: "javascript",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            },            
        ])
    })

    test("Should return the list of courses with the same tag: python", async () => {
        const result = await getCoursesByTag({
            dependencies: {courseService: courseServiceMock},
            payload: {tag: "python"}}
            ); 
        expect(result).toStrictEqual([
            {id: "2",
            title: "Python nivel intermedio",
            description: "Aprende Python nivel intermedio",
            price: 30000,
            categoryId: "2",
            courseLevel: "intermediate",
            published: true,
            instructorId: "1",
            tag: "python",
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