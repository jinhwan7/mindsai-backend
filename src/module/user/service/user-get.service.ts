import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserGetInboundPort } from '../interface/user-get/user-get.inbound.port';
import { USER_DI_TOKEN } from '../constant/user.di-token.constant';
import { UserGetOutboundPort } from '../interface/user-get/user-get.outbound.port';
import { User } from '../domain/user';
import { EXCEPTION_CODE } from 'src/common/exception/exeption.enum';

@Injectable()
export class UserGetService implements UserGetInboundPort {
  constructor(
    @Inject(USER_DI_TOKEN.USER_GET_OUTBOUND_PORT)
    private readonly userGetOutboundPort: UserGetOutboundPort,
  ) {}

  async execute(id: number): Promise<User> {
    try {
      const user = await this.userGetOutboundPort.execute(id);

      return user;
    } catch (err) {
      if (err.name === EXCEPTION_CODE.NOT_FOUND) {
        throw new NotFoundException();
      }
      throw new InternalServerErrorException(err);
    }
  }
}
