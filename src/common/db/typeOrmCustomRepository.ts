import {
  DataSource,
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CustomAbstractRepository } from './customAbstractRepository';

export class TypeOrmCustomRepository<T extends ObjectLiteral>
  implements CustomAbstractRepository
{
  protected repository: Repository<T>;

  constructor(dataSource: DataSource, entity: new () => T) {
    this.repository = dataSource.getRepository(entity);
  }

  async create(object: Record<string, any>): Promise<T> {
    try {
      return await this.repository.save(object as DeepPartial<T>);
    } catch (error) {
      throw error;
    }
  }

  async createMany(query: any[]): Promise<any> {
    try {
      const entities = this.repository.create(query);
      return await this.repository.save(entities);
    } catch (error) {
      throw error;
    }
  }

  async updateMany(query: { where: any; data: any }): Promise<any> {
    try {
      return await this.repository.update(query.where, query.data);
    } catch (error) {
      throw error;
    }
  }

  async updateOne(query: {
    id: number;
    data: Record<string, any>;
  }): Promise<any> {
    try {
      return await this.repository.update(query.id, query.data);
    } catch (error) {
      throw error;
    }
  }

  async findOne(query: any): Promise<any> {
    try {
      return await this.repository.findOne({ where: query });
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number): Promise<T | null> {
    try {
      const where = { id } as unknown as FindOptionsWhere<T>;
      return await this.repository.findOneBy(where);
    } catch (error) {
      throw error;
    }
  }

  async findMany(query: any): Promise<T[]> {
    try {
      return await this.repository.find({ where: query });
    } catch (error) {
      throw error;
    }
  }
  async deleteOneById(id: number): Promise<any> {
    try {
      const res = await this.repository.delete(id);

      return res;
    } catch (error) {
      throw error;
    }
  }
}
