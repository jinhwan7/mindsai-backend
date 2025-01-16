import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserDeleteInboundPort } from '../interface/user-delete/user-delete.inbound.port';
import { UserDeleteOutboundPort } from '../interface/user-delete/user-delete.outbound.port';
import { USER_DI_TOKEN } from '../constant/user.di-token.constant';
import { User } from '../domain/user';
import { EXCEPTION_CODE } from 'src/common/exception/exeption.enum';

@Injectable()
export class UserDeleteService implements UserDeleteInboundPort {
  constructor(
    @Inject(USER_DI_TOKEN.USER_DELETE_OUTBOUND_PORT)
    private readonly userDeleteOutboundPort: UserDeleteOutboundPort,
  ) {}

  async execute(id: number): Promise<User> {
    try {
      const user = await this.userDeleteOutboundPort.execute(id);

      return user;
    } catch (err) {
      if (err.name === EXCEPTION_CODE.NOT_FOUND) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException(err);
    }
  }
}
