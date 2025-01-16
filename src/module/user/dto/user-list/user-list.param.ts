import { userListRequestQuery } from 'src/tsRestContract/user/user.model';
import { z } from 'zod';

type userListRequestQueryType = z.infer<typeof userListRequestQuery>;

export class UserListParam {
  uniqueName?: string;
  nickName?: string;

  constructor(data: userListRequestQueryType) {
    this.uniqueName = data.uniqueName;
    this.nickName = data.nickName;
  }
}
