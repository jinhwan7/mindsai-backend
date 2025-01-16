export interface CustomAbstractRepository {
  create(query: any): Promise<any>;
  createMany(query: any): Promise<any>;
  updateOne(query: any): Promise<any>;
  findOne(query: any): Promise<any>;
  findOneById(query: any): Promise<any>;
  findMany(query: any): Promise<any>;
  deleteOneById(query: any): Promise<any>;
}
