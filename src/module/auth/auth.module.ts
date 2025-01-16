import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthLoginController } from './controller/auth-login.controller';
import { AuthLogoutController } from './controller/auth-logout.controller';
import { AuthLoginService } from './service/auth.login.service';
import { AUTH_DI_TOKEN } from './constant/auth.di-token.constant';
import { AuthRefreshController } from './controller/auth-refresh.controller';
import { AuthRefreshService } from './service/auth.refresh.service';
import { AuthLogoutService } from './service/auth.logout.service';

@Module({
  imports: [UserModule],
  controllers: [
    AuthLoginController,
    AuthLogoutController,
    AuthRefreshController,
  ],
  providers: [
    {
      provide: AUTH_DI_TOKEN.AUTH_LOGIN_INBOUND_PORT,
      useClass: AuthLoginService,
    },
    {
      provide: AUTH_DI_TOKEN.AUTH_LOGOUT_INBOUND_PORT,
      useClass: AuthLogoutService,
    },
    {
      provide: AUTH_DI_TOKEN.AUTH_REFRESH_INBOUND_PORT,
      useClass: AuthRefreshService,
    },
  ],
})
export class AuthModule {}
