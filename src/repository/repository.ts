import { FindOneOptions, FindOptionsWhere, Repository as typeRepository } from 'typeorm';
import { unmanaged, injectable } from 'inversify';

export interface Repository<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    findByQuery(query?: FindOptionsWhere<T>): Promise<T[]>;
    update(id: string, item: T): Promise<boolean>;
    save(data: T): Promise<T>;
    delete(id: string): Promise<boolean>;
}

@injectable()
export abstract class GenericRepositoryImp<TEntity> implements Repository<TEntity> {

    private readonly repository: typeRepository<TEntity>;

    public constructor(@unmanaged() repository: typeRepository<TEntity>) {
        this.repository = repository;
    }

    public async findAll(): Promise<TEntity[]> {
        return await this.repository.find();
    }

    public async findById(id: string): Promise<TEntity> {
        return await this.repository.findOneBy({ id } as unknown as FindOptionsWhere<TEntity>);
    }

    public async findOneByQuery(query: FindOptionsWhere<TEntity>): Promise<TEntity> {
        return await this.repository.findOne({ where: query });
    }

    public async findByQuery(query: FindOptionsWhere<TEntity>): Promise<TEntity[]> {
        return await this.repository.find(query);
    }

    public async update(id: string, data: any): Promise<boolean> {
        const result = await this.repository.update(id, data);
        return !!result;
    }

    public async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return !!result;
    }

    public async save(data: any): Promise<TEntity> {
        const result = await this.repository.save(data);
        return result;
    }

}