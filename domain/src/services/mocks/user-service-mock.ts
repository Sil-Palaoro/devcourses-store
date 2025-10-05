import { SafeUser } from "src/entities/user";

export const dataUsers: SafeUser[] = [
    {id: "1",
     name: "silvina",
     surname: "Pal",
     email: "silvi@gmail.com",
     role: "admin",
    },
    {id: "2",
     name: "aye",
     surname: "Pala",
     email: "aye@gmail.com",
     role: "student",
    },
    {id: "3",
     name: "olivia",
     surname: "Dea",
     email: "oli@gmail.com",
     role: "instructor",
    }
];

export const emptyDataUsers: SafeUser[] = []