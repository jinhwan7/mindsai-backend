import { Module } from '@nestjs/common';
import { UserCreateController } from './controller/user-create.controller';
import { UserCreateService } from './service/user.create.service';
import { UserRepository } from './repository/user.repository';
import { USER_DI_TOKEN } from './constant/user.di-token.constant';
import { UserCreateRepository } from './repository/user-create.repository';

@Module({
  controllers: [UserCreateController],
  providers: [
    {
      provide: USER_DI_TOKEN.USER_CREATE_INBOUND_PORT,
      useClass: UserCreateService,
    },
    {
      provide: USER_DI_TOKEN.USER_CREATE_OUTBOUND_PORT,
      useClass: UserCreateRepository,
    },
  ],
  exports: [USER_DI_TOKEN.USER_CREATE_OUTBOUND_PORT],
})
export class UserModule {}
