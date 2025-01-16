import { User } from '../../domain/user';

export class UserUpdateQuery {
  id: number;
  data: { password?: string; nickName?: string; refreshToken?: string };

  constructor(data: User) {
    this.data = {};
    this.id = data.id;
    this.data.password = data.password;
    this.data.nickName = data.nickName;
    this.data.refreshToken = data.refreshToken;
  }
}
