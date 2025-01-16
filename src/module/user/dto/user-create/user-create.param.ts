import { z } from 'zod';
import { User } from '../../domain/user';
import { userCreateRequest } from 'src/tsRestContract/user/user.model';

type userCreateRequestType = z.infer<typeof userCreateRequest>;

export class UserCreateParam {
  uniqueName: string;
  nickName: string;
  password: string;

  constructor(data: userCreateRequestType) {
    this.uniqueName = data.uniqueName;
    this.nickName = data.nickName;
    this.password = data.password;
  }
}
