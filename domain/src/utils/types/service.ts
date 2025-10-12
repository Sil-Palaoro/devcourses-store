import { Entity } from "./entity";

export interface Service<TEntity extends Entity> 
    extends ReadOnlyService<TEntity>, 
    MutableService<TEntity> {};

export interface ReadOnlyService<TEntity extends Entity> {
    getById: (id: string) => Promise<TEntity | undefined>;
    getAll: () => Promise<TEntity[]>;
};

export interface MutableService<TEntity extends Entity> {
    create: (data: TEntity) => Promise<void>;
    delete: (id: string) => Promise<void>;   
};
