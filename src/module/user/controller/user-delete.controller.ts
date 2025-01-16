import { Controller, Inject, UseGuards } from '@nestjs/common';
import { USER_DI_TOKEN } from '../constant/user.di-token.constant';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { userApi } from 'src/tsRestContract/user/user.contract';

import { UserDeleteInboundPort } from '../interface/user-delete/user-delete.inbound.port';
import { UserGuard } from 'src/common/guard/user.guard';

@Controller()
export class UserDeleteController {
  constructor(
    @Inject(USER_DI_TOKEN.USER_DELETE_INBOUND_PORT)
    private readonly userDeleteInboundPort: UserDeleteInboundPort,
  ) {}

  @TsRestHandler(userApi.userDelete)
  @UseGuards(UserGuard)
  async Delete() {
    return tsRestHandler(userApi.userDelete, async ({ params }) => {
      await this.userDeleteInboundPort.execute(Number(params.id));
      return { status: 200, body: 'success' };
    });
  }
}
