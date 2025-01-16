//*****예시를 들기위해 작성했습니다*****

// import { CustomAbstractRepository } from './customAbstractRepository';

// export class MongoDbCustomRepository<T> implements CustomAbstractRepository {
//   protected repository: Model<T>;

//   async create(object: Record<string, any>): Promise<T> {
//     return await this.repository.create(object);
//   }

//   async createMany(objects: Record<string, any>[]): Promise<T[]> {
//     return await this.repository.insertMany(objects);
//   }

//   async updateOne(query: { where: any; data: any }): Promise<any> {
//     return await this.repository.updateOne(query);
//   }

//   async updateMany(query: { where: any; data: any }): Promise<any> {
//     return await this.repository.updateMany(query);
//   }

//   async findOne(query: any): Promise<any> {
//     return await this.repository.findOne(query);
//   }

//   async findOneById(query: any): Promise<any> {
//     return await this.repository.findById(query);
//   }

//   async findMany(query: any): Promise<any> {
//     return await this.repository.find(query);
//   }
// }
