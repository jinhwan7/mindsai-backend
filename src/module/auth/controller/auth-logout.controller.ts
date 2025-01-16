import { Controller, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { authApi } from 'src/tsRestContract/auth/auth.contract';
import { AUTH_DI_TOKEN } from '../constant/auth.di-token.constant';
import { AuthLogoutInboundPort } from '../interface/auth-logout.inbound.port';
import { UserGuard } from 'src/common/guard/user.guard';
import { Request, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../interface/userAuthInfoRequest.type';

@Controller()
export class AuthLogoutController {
  constructor(
    @Inject(AUTH_DI_TOKEN.AUTH_LOGOUT_INBOUND_PORT)
    private readonly authLogoutInboundPort: AuthLogoutInboundPort,
  ) {}

  @TsRestHandler(authApi.logout)
  @UseGuards(UserGuard)
  async logout(
    @Req() req: IGetUserAuthInfoRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    return tsRestHandler(authApi.logout, async ({}) => {
      const userId = req.userId;
      await this.authLogoutInboundPort.execute(userId);
      res.removeHeader('Authorization');

      res.clearCookie('refreshToken', {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        path: '/',
      });

      return { status: 200, body: 'success' };
    });
  }
}
