import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../domain/user';
import { UserRepository } from './user.repository';
import { EntityManager } from 'typeorm';
import { UserDeleteOutboundPort } from '../interface/user-delete/user-delete.outbound.port';

@Injectable()
export class UserDeleteRepository implements UserDeleteOutboundPort {
  constructor(private userRepository: UserRepository) {}
  async execute(id: number, manager?: EntityManager): Promise<User> {
    const deleteResult = await this.userRepository.deleteOneById(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException();
    }
    const user = User.from(deleteResult);
    return user;
  }
}
