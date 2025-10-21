import { vi } from "vitest";

export const categoryServiceMockUnit = {
    getAll: vi.fn(),
    getById: vi.fn(), 
    getByName: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
}