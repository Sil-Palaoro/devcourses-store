import { Course } from "@devcourses/domain";

export const dataCourses: Course[] = [
    {id: "1",
    title: "Javascript para principiantes",
    description: "Aprende Javascript desde 0 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet orci elementum tellus vulputate sodales. Cras ornare elementum ullamcorper. Etiam ligula elit, mollis vitae tempor ac, varius ullamcorper mauris. ",
    price: 30000,
    categoryId: "1",
    courseLevel: "beginner",
    published: true,
    instructorId: "1",
    tag: "javascript",
    },
    {id: "2",
    title: "Python nivel intermedio",
    description: "Aprende Python nivel intermedio - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet orci elementum tellus vulputate sodales. Cras ornare elementum ullamcorper. Etiam ligula elit, mollis vitae tempor ac, varius ullamcorper mauris. ",
    price: 30000,
    categoryId: "2",
    courseLevel: "intermediate",
    published: true,
    instructorId: "1",
    tag: "python"
    },
    {id: "3",
    title: "SQL para principiantes",
    description: "Aprende SQL desde 0 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet orci elementum tellus vulputate sodales. Cras ornare elementum ullamcorper. Etiam ligula elit, mollis vitae tempor ac, varius ullamcorper mauris. ",
    price: 30000,
    categoryId: "3",
    courseLevel: "beginner",
    published: true,
    instructorId: "1",
    tag: "sql"
    }
];

export const emptyDataCourses: Course[] = []