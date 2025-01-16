import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserUpdateInboundPort } from '../interface/user-update/user-update.inbound.port';
import { UserUpdateOutboundPort } from '../interface/user-update/user-update.outbound.port';
import { User } from '../domain/user';
import { USER_DI_TOKEN } from '../constant/user.di-token.constant';
import { UserUpdateParam } from '../dto/user-update/user-update.param';

import bcrypt from 'bcryptjs';
import { UserGetOutboundPort } from '../interface/user-get/user-get.outbound.port';

import { EXCEPTION_CODE } from 'src/common/exception/exeption.enum';
import { UserUpdateQuery } from '../dto/user-update/user-update.query';

@Injectable()
export class UserUpdateService implements UserUpdateInboundPort {
  constructor(
    @Inject(USER_DI_TOKEN.USER_UPDATE_OUTBOUND_PORT)
    private readonly userUpdateOutboundPort: UserUpdateOutboundPort,
    @Inject(USER_DI_TOKEN.USER_GET_OUTBOUND_PORT)
    private readonly userGetOutboundPort: UserGetOutboundPort,
  ) {}

  async execute(userUpdateParam: UserUpdateParam): Promise<User> {
    try {
      const existingUser = await this.userGetOutboundPort.execute(
        userUpdateParam.id,
      );

      let hashedPassword = existingUser.password;
      if (userUpdateParam.data.password) {
        hashedPassword = await bcrypt.hashSync(
          userUpdateParam.data.password,
          10,
        );
      }

      // 3. 업데이트할 유저 객체 생성
      const user = User.from({
        id: existingUser.id,
        uniqueName: existingUser.uniqueName,
        nickName: userUpdateParam.data.nickName || existingUser.nickName,
        password: hashedPassword,
      });

      const userUpdateQuery = new UserUpdateQuery(user);

      return await this.userUpdateOutboundPort.execute(userUpdateQuery);
    } catch (err) {
      if (err.name === EXCEPTION_CODE.NOT_FOUND) {
        throw new NotFoundException();
      }
      throw new InternalServerErrorException(err);
    }
  }
}
