import { Controller, Inject } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { userApi } from 'src/tsRestContract/user/user.contract';
import { USER_DI_TOKEN } from '../constant/user.di-token.constant';
import { User } from '../domain/user';
import { UserGetResponse } from '../dto/user-get/user-get.response';
import { UserGetInboundPort } from '../interface/user-get/user-get.inbound.port';

@Controller()
export class UserGetController {
  constructor(
    @Inject(USER_DI_TOKEN.USER_GET_INBOUND_PORT)
    private readonly userGetInboundPort: UserGetInboundPort,
  ) {}

  @TsRestHandler(userApi.userGet)
  async getOne() {
    return tsRestHandler(userApi.userGet, async ({ params }) => {
      const user: User = await this.userGetInboundPort.execute(
        Number(params.id),
      );

      const userGetResponse = new UserGetResponse(user);
      return { status: 200, body: userGetResponse };
    });
  }
}
