import { EntityManager } from 'typeorm';
import { User } from '../../domain/user';
import { UserUpdateQuery } from '../../dto/user-update/user-update.query';

export interface UserUpdateOutboundPort {
  execute(
    userUpdateQeury: UserUpdateQuery,
    manager?: EntityManager,
  ): Promise<User>;
}
