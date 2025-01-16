import { Controller, Inject } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { userApi } from 'src/tsRestContract/user/user.contract';
import { UserUpdateInboundPort } from '../interface/user-update/user-update.inbound.port';
import { UserUpdateParam } from '../dto/user-update/user-update.param';
import { USER_DI_TOKEN } from '../constant/user.di-token.constant';

@Controller()
export class UserUpdateController {
  constructor(
    @Inject(USER_DI_TOKEN.USER_UPDATE_INBOUND_PORT)
    private readonly userUpdateInboundPort: UserUpdateInboundPort,
  ) {}

  @TsRestHandler(userApi.userUpdate)
  async Update() {
    return tsRestHandler(
      userApi.userUpdate,
      async ({ params, body: userUpdateRequest }) => {
        const userUpdateParam = new UserUpdateParam(
          Number(params.id),
          userUpdateRequest,
        );
        const user = await this.userUpdateInboundPort.execute(userUpdateParam);
        return { status: 200, body: 'success' };
      },
    );
  }
}
