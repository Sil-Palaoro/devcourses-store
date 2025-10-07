import { Entity } from "./entity";

export interface Service<TEntity extends Entity> {
    getById: (id: string) => Promise<TEntity | undefined>;
    getAll: () => Promise<TEntity[]>
};
