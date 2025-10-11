import { Entity } from "./entity";

export interface Service<TEntity extends Entity> {
    getById: (id: string) => Promise<TEntity | undefined>;
    getAll: () => Promise<TEntity[]>;
    create: (data: TEntity) => Promise<void>;
    delete: (id: string) => Promise<void>;
};
