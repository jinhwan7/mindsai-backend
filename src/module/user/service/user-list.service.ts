import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserListInboundPort } from '../interface/user-list/user-list.inbound.port';
import { USER_DI_TOKEN } from '../constant/user.di-token.constant';
import { UserListOutboundPort } from '../interface/user-list/user-list.outbound.port';
import { UserListParam } from '../dto/user-list/user-list.param';
import { User } from '../domain/user';
import { EXCEPTION_CODE } from 'src/common/exception/exeption.enum';
import { UserListQuery } from '../dto/user-list/user-list.query';

@Injectable()
export class UserListService implements UserListInboundPort {
  constructor(
    @Inject(USER_DI_TOKEN.USER_LIST_OUTBOUND_PORT)
    private readonly userListOutboundPort: UserListOutboundPort,
  ) {}

  async execute(userListParam: UserListParam): Promise<User[]> {
    try {
      const userListQuery = new UserListQuery(userListParam);

      const users = await this.userListOutboundPort.execute(userListQuery);

      return users;
    } catch (err) {
      if (err.name === EXCEPTION_CODE.NOT_FOUND) {
        throw new NotFoundException();
      }
      throw new InternalServerErrorException(err);
    }
  }
}
