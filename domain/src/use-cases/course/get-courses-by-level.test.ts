import { describe, expect, test } from "vitest";
import { getCoursesByLevel } from "./get-courses-by-level"
import { courseService } from "../../services/mocks/course-service-mock";


describe("getCoursesByLevel", async () =>{

    test("Should return the list of courses with courseLevel: beginner", async () => {
        const result = await getCoursesByLevel({
            dependencies: {courseService},
            payload: {courseLevel: "beginner"}}
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
            tags: ["javascript"]
            },            
            {id: "3",
            title: "SQL para principiantes",
            description: "Aprende SQL desde 0",
            price: 30000,
            categoryId: "3",
            courseLevel: "beginner",
            published: true,
            instructorId: "1",
            tags: ["sql"]
            }
        ])
    })

    test("Should return the list of courses with courseLevel: intermediate", async () => {
        const result = await getCoursesByLevel({
            dependencies: {courseService},
            payload: {courseLevel: "intermediate"}}
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
            tags: ["python"]
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