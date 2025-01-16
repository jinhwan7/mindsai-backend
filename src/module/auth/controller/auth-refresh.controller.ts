import { Controller, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { Request, Response } from 'express';
import { authApi } from 'src/tsRestContract/auth/auth.contract';
import { AUTH_DI_TOKEN } from '../constant/auth.di-token.constant';
import { AuthRefreshInboundPort } from '../interface/auth-refresh.inbound.port';
import { UserGuard } from 'src/common/guard/user.guard';
import { AuthToken } from '../domain/authToken';

@Controller()
export class AuthRefreshController {
  constructor(
    @Inject(AUTH_DI_TOKEN.AUTH_REFRESH_INBOUND_PORT)
    private readonly authRefreshInboundPort: AuthRefreshInboundPort,
  ) {}

  @TsRestHandler(authApi.refresh)
  @UseGuards(UserGuard)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return tsRestHandler(authApi.refresh, async () => {
      const refreshToken = req.cookies.refreshToken;
      const authToken: AuthToken =
        await this.authRefreshInboundPort.execute(refreshToken);

      res.setHeader('Authorization', `Bearer ${authToken.accessToken}`);
      res.cookie('refreshToken', authToken.refreshToken, {
        sameSite: 'none',
        secure: true,
        path: '/',
        httpOnly: true,
      });
      return { status: 200, body: 'success' };
    });
  }
}
