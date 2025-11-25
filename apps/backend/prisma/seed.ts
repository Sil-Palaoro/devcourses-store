import { PrismaClient } from "@prisma/client";
import { CategoriesNames, createCourse, CreateCourseDTO } from "@devcourses/domain";
import { prismaCourseServiceImplementation } from "../src/services/prisma-course-service-implementation";


const db = new PrismaClient();

async function main() {
    const names = Object.values(CategoriesNames);

    for (const name of names) {
        await db.category.upsert({
            where: { name },
            update: {},
            create: {
                name,
                description: `${name} courses`,
            }
        });
    }
    console.log("Categories seeded");

    // 2. Seed de cursos por nivel
    const courses: CreateCourseDTO[] = [
        // ============================================================
        // BEGINNER
        // ============================================================
        {
            title: "Fundamentos de Desarrollo Web",
            description:
                "Un curso pensado para quienes quieren ingresar al mundo del desarrollo web desde cero. En él aprenderás HTML, CSS y JavaScript desde lo más básico, entendiendo de forma clara cómo se construyen las páginas web modernas. Cada módulo incluye ejemplos visuales y ejercicios guiados que te permitirán ver resultados rápidamente. Hacia el final del curso, también explorarás conceptos esenciales como diseño responsivo, buenas prácticas y estructura de proyectos. Saldrás con tus primeras páginas web publicadas y el mapa completo de lo que significa trabajar como desarrollador frontend.",
            price: 30000,
            courseLevel: "beginner",
            published: true,
            tag: "javascript"
        },
        {
            title: "Introducción a la Programación con Python",
            description:
                "Este curso está diseñado para quienes dan sus primeros pasos en la programación. Aprenderás los conceptos fundamentales que atraviesan cualquier lenguaje, como variables, tipos de datos, estructuras de control, funciones y manejo básico de archivos. Todo se explica de forma simple, con ejercicios pensados para que puedas avanzar sin frustrarte y consolidar cada concepto. También te introducirás al pensamiento lógico y la resolución de problemas, habilidades clave para cualquier desarrollador. Al finalizar, serás capaz de crear tus primeros programas funcionales y tendrás una base sólida para continuar hacia niveles intermedios o especializaciones más específicas.",
            price: 30000,
            courseLevel: "beginner",
            published: true,
            tag: "python"
        },

        // ============================================================
        // INTERMEDIATE
        // ============================================================
        {
            title: "Desarrollo Web Moderno con React",
            description:
                "En este curso llevarás tus conocimientos de React a un siguiente nivel. Aprenderás sobre componentes avanzados, buenas prácticas y manejo del estado global.\n\nConstruirás un proyecto completo con rutas, persistencia de datos y lógica aplicada al mundo real para fortalecer tu portfolio.",
            price: 35000,
            courseLevel: "intermediate",
            published: true,
            tag: "javascript"
        },
        {
            title: "SQL y Bases de Datos Relacionales",
            description:
                "En este curso aprenderás a utilizar SQL para gestionar y consultar bases de datos como PostgreSQL o MySQL. Trabajarás con creación de tablas, relaciones, joins, subconsultas, funciones agregadas y optimización de consultas. Todo enfocado en casos de uso reales y problemas prácticos. Además, te adentrarás en el diseño de bases de datos: normalización, claves primarias, foráneas y modelado de relaciones. Con este conocimiento podrás integrarte sin problemas en proyectos backend o full-stack que requieran persistencia de datos profesional.",
            price: 35000,
            courseLevel: "intermediate",
            published: true,
            tag: "sql"
        },

        // ============================================================
        // ADVANCED
        // ============================================================
        {
            title: "Arquitectura Backend con Node.js y Microservicios",
            description:
                "Un curso avanzado para quienes buscan dominar patrones modernos de arquitectura backend. Aprenderás a diseñar microservicios, manejar colas de eventos, implementar autenticación robusta, aplicar principios SOLID y estructurar APIs complejas utilizando Node.js y Express. También veremos pruebas automatizadas y estrategias de escalabilidad. El enfoque del curso es totalmente práctico: construirás servicios independientes que se comunican entre sí, integrando prácticas de logging, monitoreo y despliegue. Ideal para quienes ya trabajan como desarrolladores backend o full-stack y quieren llevar su seniority al próximo nivel.",
            price: 40000,
            courseLevel: "advanced",
            published: true,
            tag: "javascript"
        },
        {
            title: "Python para Ciencia de Datos y Machine Learning",
            description:
                "Este curso está pensado para desarrolladores que ya dominan Python y quieren entrar en el mundo del análisis de datos y modelos predictivos. Aprenderás a manipular datasets con Pandas, visualizar información con Matplotlib y construir modelos de Machine Learning con Scikit-Learn. A lo largo del curso trabajarás con casos reales, desde limpieza de datos hasta entrenamiento, evaluación y mejora de modelos. Al finalizar, tendrás el conocimiento necesario para resolver problemas de data science de manera profesional y crear tus primeras soluciones basadas en IA clásica.",
            price: 40000,
            courseLevel: "advanced",
            published: true,
            tag: "python"
        },
    ];

    for (const course of courses) {
        await createCourse({ 
            dependencies: { courseService: prismaCourseServiceImplementation }, 
            payload: course });
    }

    console.log("Courses seeded");

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
