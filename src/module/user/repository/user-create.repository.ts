import { Injectable } from '@nestjs/common';
import { UserCreateOutboundPort } from '../interface/user-create/user-create.outbound.port';
import { User } from '../domain/user';
import { UserCreateQeury } from '../dto/user-create/user-create.query';
import { UserRepository } from './user.repository';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserCreateRepository implements UserCreateOutboundPort {
  constructor(private userRepository: UserRepository) {}
  async execute(
    userCreateQeury: UserCreateQeury,
    manager?: EntityManager,
  ): Promise<User> {
    const userEntity = await this.userRepository.create(userCreateQeury);
    const user = User.from(userEntity);
    return user;
  }
}
