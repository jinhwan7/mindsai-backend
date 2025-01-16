import { Controller, Inject, Res } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { authApi } from 'src/tsRestContract/auth/auth.contract';
import { AuthLoginInboundPort } from '../interface/auth-login.inbound.port';
import { Response } from 'express';
import { AuthToken } from '../domain/authToken';
import { AUTH_DI_TOKEN } from '../constant/auth.di-token.constant';

@Controller()
export class AuthLoginController {
  constructor(
    @Inject(AUTH_DI_TOKEN.AUTH_LOGIN_INBOUND_PORT)
    private readonly authLoginInboundPort: AuthLoginInboundPort,
  ) {}

  @TsRestHandler(authApi.login)
  async login(@Res({ passthrough: true }) res: Response) {
    return tsRestHandler(authApi.login, async ({ body: authLoginRequest }) => {
      const authToken: AuthToken =
        await this.authLoginInboundPort.execute(authLoginRequest);

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
