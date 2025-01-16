import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserGetOutboundPort } from 'src/module/user/interface/user-get/user-get.outbound.port';
import { USER_DI_TOKEN } from 'src/module/user/constant/user.di-token.constant';
import { User } from 'src/module/user/domain/user';
import { UserUpdateOutboundPort } from 'src/module/user/interface/user-update/user-update.outbound.port';
import { UserUpdateQuery } from 'src/module/user/dto/user-update/user-update.query';
import { AuthRefreshInboundPort } from '../interface/auth-refresh.inbound.port';
import { AuthToken } from '../domain/authToken';

@Injectable()
export class AuthRefreshService implements AuthRefreshInboundPort {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_DI_TOKEN.USER_GET_OUTBOUND_PORT)
    private readonly userGetOutboundPort: UserGetOutboundPort,
    @Inject(USER_DI_TOKEN.USER_UPDATE_OUTBOUND_PORT)
    private readonly userUpdateOutboundPort: UserUpdateOutboundPort,
  ) {}

  async execute(refreshToken: string): Promise<AuthToken> {
    try {
      const verifyToken = await this.jwtService.verify(refreshToken);
      const userId = verifyToken['id'];
      const user: User = await this.userGetOutboundPort.execute(userId);

      const newAccessToken = this.jwtService.sign(
        { id: user.id },
        {
          expiresIn: '3h',
        },
      );
      const newRefreshToken = this.jwtService.sign(
        {},
        {
          expiresIn: '1d',
        },
      );
      user.refreshToken = newRefreshToken;
      const userUpdateQuery = new UserUpdateQuery(user);
      await this.userUpdateOutboundPort.execute(userUpdateQuery);

      const authToken = new AuthToken(newAccessToken, newRefreshToken);
      return authToken;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
