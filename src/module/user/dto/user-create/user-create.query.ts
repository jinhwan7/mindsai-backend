import { User } from '../../domain/user';

export class UserCreateQeury {
  uniqueName: string;
  nickName: string;
  password: string;

  constructor(data: User) {
    this.uniqueName = data.uniqueName;
    this.nickName = data.nickName;
    this.password = data.password;
  }
}
