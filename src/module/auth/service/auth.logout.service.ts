import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AuthLogoutInboundPort } from '../interface/auth-logout.inbound.port';
import { USER_DI_TOKEN } from 'src/module/user/constant/user.di-token.constant';
import { UserUpdateOutboundPort } from 'src/module/user/interface/user-update/user-update.outbound.port';
import { UserGetOutboundPort } from 'src/module/user/interface/user-get/user-get.outbound.port';
import { UserUpdateQuery } from 'src/module/user/dto/user-update/user-update.query';
import { EXCEPTION_CODE } from 'src/common/exception/exeption.enum';

@Injectable()
export class AuthLogoutService implements AuthLogoutInboundPort {
  constructor(
    @Inject(USER_DI_TOKEN.USER_GET_OUTBOUND_PORT)
    private readonly userGetOutboundPort: UserGetOutboundPort,
    @Inject(USER_DI_TOKEN.USER_UPDATE_OUTBOUND_PORT)
    private readonly userUpdateOutboundPort: UserUpdateOutboundPort,
  ) {}

  async execute(userId: number): Promise<void> {
    try {
      const user = await this.userGetOutboundPort.execute(userId);

      user.refreshToken = null;

      const userUpdateQuery = new UserUpdateQuery(user);
      await this.userUpdateOutboundPort.execute(userUpdateQuery);
    } catch (err) {
      if (err.name === EXCEPTION_CODE.NOT_FOUND) {
        throw new NotFoundException();
      }
      throw new InternalServerErrorException(err);
    }
  }
}
