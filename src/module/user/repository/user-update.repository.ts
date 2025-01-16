import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../domain/user';
import { UserRepository } from './user.repository';
import { EntityManager } from 'typeorm';
import { UserUpdateOutboundPort } from '../interface/user-update/user-update.outbound.port';
import { UserUpdateQuery } from '../dto/user-update/user-update.query';

@Injectable()
export class UserUpdateRepository implements UserUpdateOutboundPort {
  constructor(private userRepository: UserRepository) {}
  async execute(
    userUpdateQeury: UserUpdateQuery,
    manager?: EntityManager,
  ): Promise<User> {
    const userEntity = await this.userRepository.updateOne(userUpdateQeury);
    const user = User.from(userEntity);
    return user;
  }
}
