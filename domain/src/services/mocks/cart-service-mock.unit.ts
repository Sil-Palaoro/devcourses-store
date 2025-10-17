import { vi } from "vitest";

export const cartServiceMockUnit = {
    getAll: vi.fn(),
    getById: vi.fn(), 
    getByUserId: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    addItemToCart: vi.fn(),
    removeItemFromCart: vi.fn()
}