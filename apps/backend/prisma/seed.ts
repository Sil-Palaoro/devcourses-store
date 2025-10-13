import { PrismaClient } from "@prisma/client";
import { CategoriesNames } from "@devcourses/domain";

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
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
