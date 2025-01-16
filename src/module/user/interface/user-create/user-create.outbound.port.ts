import { EntityManager } from 'typeorm';
import { User } from '../../domain/user';
import { UserCreateQeury } from '../../dto/user-create/user-create.query';

export interface UserCreateOutboundPort {
  execute(
    userCreateQeury: UserCreateQeury,
    manager?: EntityManager,
  ): Promise<User>;
}
