import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { AuthLoginInboundPort } from '../interface/auth-login.inbound.port';
import bcrypt from 'bcryptjs';
import { AuthLoginRequest } from '../dto/auth-login.request';
import { USER_DI_TOKEN } from 'src/module/user/constant/user.di-token.constant';
import { AuthToken } from '../domain/authToken';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/module/user/domain/user';
import { ConfigService } from '@nestjs/config';
import { UserListOutboundPort } from 'src/module/user/interface/user-list/user-list.outbound.port';

import { EXCEPTION_CODE } from 'src/common/exception/exeption.enum';
import { UserUpdateOutboundPort } from 'src/module/user/interface/user-update/user-update.outbound.port';
import { UserListQuery } from 'src/module/user/dto/user-list/user-list.query';
import { UserUpdateQuery } from 'src/module/user/dto/user-update/user-update.query';

@Injectable()
export class AuthLoginService implements AuthLoginInboundPort {
  constructor(
    @Inject(USER_DI_TOKEN.USER_LIST_OUTBOUND_PORT)
    private readonly userListOutboundPort: UserListOutboundPort,
    @Inject(USER_DI_TOKEN.USER_UPDATE_OUTBOUND_PORT)
    private readonly userUpdateOutboundPort: UserUpdateOutboundPort,
    private readonly jwtService: JwtService,
  ) {}

  async execute(authLoginRequest: AuthLoginRequest): Promise<AuthToken> {
    try {
      const userListQuery = new UserListQuery({
        uniqueName: authLoginRequest.uniqueName,
      });

      const result = await this.userListOutboundPort.execute(userListQuery);
      const user: User = result[0];

      bcrypt.compareSync(authLoginRequest.password, user.password);

      const accessToken = this.jwtService.sign(
        { id: user.id },
        {
          expiresIn: '3h',
        },
      );
      const refreshToken = this.jwtService.sign(
        {},
        {
          expiresIn: '1d',
        },
      );
      user.refreshToken = refreshToken;
      const userUpdateQeury = new UserUpdateQuery(user);
      await this.userUpdateOutboundPort.execute(userUpdateQeury);

      const authToken = new AuthToken(accessToken, refreshToken);
      return authToken;
    } catch (err) {
      if (err.name === EXCEPTION_CODE.NOT_FOUND) {
        throw new NotFoundException('아이디나 비밀번호가 틀림');
      }
      throw new InternalServerErrorException(err);
    }
  }
}
