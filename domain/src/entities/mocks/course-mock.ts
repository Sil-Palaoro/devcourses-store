import { Course } from "src/entities";

export const dataCourses: Course[] = [
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
];

export const emptyDataCourses: Course[] = []