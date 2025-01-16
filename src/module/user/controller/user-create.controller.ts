import { Controller, Inject } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { userApi } from 'src/tsRestContract/user/user.contract';
import { UserCreateInboundPort } from '../interface/user-create/user-create.inbound.port';
import { UserCreateParam } from '../dto/user-create/user-create.param';
import { USER_DI_TOKEN } from '../constant/user.di-token.constant';

@Controller()
export class UserCreateController {
  constructor(
    @Inject(USER_DI_TOKEN.USER_CREATE_INBOUND_PORT)
    private readonly userCreateInboundPort: UserCreateInboundPort,
  ) {}

  @TsRestHandler(userApi.userCreate)
  async create() {
    return tsRestHandler(
      userApi.userCreate,
      async ({ body: userCreateRequest }) => {
        //TODO: id길이, Pw형식 등은 zod로 앞단에서 처리하기

        const userCreateParam = new UserCreateParam(userCreateRequest);
        await this.userCreateInboundPort.execute(userCreateParam);
        return { status: 200, body: 'success' };
      },
    );
  }
}
