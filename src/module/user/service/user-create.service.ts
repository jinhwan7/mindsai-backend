import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserCreateInboundPort } from '../interface/user-create/user-create.inbound.port';

import { UserCreateOutboundPort } from '../interface/user-create/user-create.outbound.port';
import { User } from '../domain/user';
import bcrypt from 'bcryptjs';
import { USER_DI_TOKEN } from '../constant/user.di-token.constant';
import { UserCreateParam } from '../dto/user-create/user-create.param';
import { UserCreateQeury } from '../dto/user-create/user-create.query';

@Injectable()
export class UserCreateService implements UserCreateInboundPort {
  constructor(
    @Inject(USER_DI_TOKEN.USER_CREATE_OUTBOUND_PORT)
    private readonly userCreateOutboundPort: UserCreateOutboundPort,
  ) {}

  async execute(userCreateParam: UserCreateParam): Promise<User> {
    try {
      const hashedPassword = bcrypt.hashSync(userCreateParam.password, 10);

      const user = User.from({
        uniqueName: userCreateParam.uniqueName,
        nickName: userCreateParam.nickName,
        password: hashedPassword,
      });
      const userCreateQuery = new UserCreateQeury(user);
      return await this.userCreateOutboundPort.execute(userCreateQuery);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException();
      }
      throw new InternalServerErrorException(err);
    }
  }
}
