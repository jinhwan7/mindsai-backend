import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserGetOutboundPort } from '../interface/user-get/user-get.outbound.port';
import { EntityManager } from 'typeorm';
import { User } from '../domain/user';

@Injectable()
export class UserGetRepository implements UserGetOutboundPort {
  constructor(private userRepository: UserRepository) {}
  async execute(id: number, manager?: EntityManager): Promise<User> {
    const userEntity = await this.userRepository.findOneById(id);
    if (!userEntity) {
      throw new NotFoundException();
    }
    const user = User.from(userEntity);
    return user;
  }
}
