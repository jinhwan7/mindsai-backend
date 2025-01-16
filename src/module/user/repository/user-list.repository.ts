import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../domain/user';
import { UserRepository } from './user.repository';
import { EntityManager } from 'typeorm';

import { UserListOutboundPort } from '../interface/user-list/user-list.outbound.port';
import { UserListQuery } from '../dto/user-list/user-list.query';

@Injectable()
export class UserListRepository implements UserListOutboundPort {
  constructor(private userRepository: UserRepository) {}
  async execute(
    userListQeury: UserListQuery,
    manager?: EntityManager,
  ): Promise<User[]> {
    const userEntities = await this.userRepository.findMany(userListQeury);

    if (!userEntities.length) {
      throw new NotFoundException();
    }

    const users = userEntities.map((userEntity) => User.from(userEntity));
    return users;
  }
}
