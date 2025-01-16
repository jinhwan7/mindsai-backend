import { Controller, Inject } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { userApi } from 'src/tsRestContract/user/user.contract';
import { UserListInboundPort } from '../interface/user-list/user-list.inbound.port';
import { USER_DI_TOKEN } from '../constant/user.di-token.constant';
import { UserListParam } from '../dto/user-list/user-list.param';
import { UserListResponse } from '../dto/user-list/user-list.response';

@Controller()
export class UserListController {
  constructor(
    @Inject(USER_DI_TOKEN.USER_LIST_INBOUND_PORT)
    private readonly userListInboundPor: UserListInboundPort,
  ) {}

  @TsRestHandler(userApi.userList)
  async getUsers() {
    return tsRestHandler(
      userApi.userList,
      async ({ query: userListRequestQuery }) => {
        const userListParam = new UserListParam(userListRequestQuery);

        const users = await this.userListInboundPor.execute(userListParam);
        const userListResponse = new UserListResponse(users);
        return { status: 200, body: userListResponse };
      },
    );
  }
}
