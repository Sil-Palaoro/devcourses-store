import { vi } from "vitest";

export const courseServiceMockUnit = {
    getAll: vi.fn(),
    getById: vi.fn(), 
    getByUserId: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    getByCourseLevel: vi.fn(),
    getByTag: vi.fn()
}