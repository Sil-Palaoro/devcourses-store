import { vi } from "vitest";

export const userServiceMockUnit = {
    getAll: vi.fn(),
    getById: vi.fn(),
    getByRole: vi.fn(),
    getByName: vi.fn(),
    getBySurname: vi.fn(),
    getByEmail: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
}