import { Category } from "../../entities/category";
import { dataCategories } from "../../entities/mocks/category-mock";
import { vi } from "vitest";

export const categoryServiceMock = {
        getById: async (id: string) => dataCategories.find((c: Category) => c.id == id ),
        getAll: async () => dataCategories,
        getByName: async (name: string) => dataCategories.find((c: Category) => (c.name === name)),
        create: vi.fn(async (category: Category) => {
            if (category) dataCategories.push(category); 
        }),
        delete: vi.fn(async (id: string) => {
            const index = dataCategories.findIndex((c: Category) => c.id === id);
            if (index !== -1) dataCategories.splice(index, 1);
        }),
    };
