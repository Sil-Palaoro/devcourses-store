import { Course } from "src/entities";
import { dataCourses, emptyDataCourses } from "./mocks/course-service-mock";

export interface CourseService {
    getById: (id: string) => Promise<Course | undefined>;
    getAll: () => Promise<Course[]>
};

export const courseService = {
        getById: async (id: string) => {
            return dataCourses.find((course) => course.id == id );
        },
        getAll: async () => {
            return dataCourses;
        }
    };

//De esta forma pasan los tests que piden la lista completa, pero 
// no pasa el test del error si la lista está vacía. Si cambio en getAll "dataCourses" por 
// emptyDataCourses, pasa el test de error, pero no pasa el que pide la lista completa. FALTA arreglar esto
//Porque no me deja poner en el test la condicion if(result.lenght === 0) porque dice que Error no tiene propiedad lenght