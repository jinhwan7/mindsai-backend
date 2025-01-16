import { User } from '../../domain/user';

export class UserGetResponse {
  id: number;
  uniqueName: string;
  nickName: string;

  constructor(user: User) {
    this.id = user.id;
    this.uniqueName = user.uniqueName;
    this.nickName = user.nickName;
  }
}
