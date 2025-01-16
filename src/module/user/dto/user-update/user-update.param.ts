import { userUpdateRequest } from 'src/tsRestContract/user/user.model';
import { z } from 'zod';

type userUpdateRequestType = z.infer<typeof userUpdateRequest>;

export class UserUpdateParam {
  id: number;
  data: userUpdateRequestType;

  constructor(id: number, data: userUpdateRequestType) {
    this.data = { ...data };
    this.id = id;
    this.data.password = data?.password;
    this.data.nickName = data?.nickName;
  }
}
