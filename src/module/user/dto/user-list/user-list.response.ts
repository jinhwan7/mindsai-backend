import { User } from '../../domain/user';

export class UserListResponse extends Array<{
    id: number;
    uniqueName: string;
    nickName: string;
  }>{
  constructor(users: User[]) {
    super();
    return users.map((user) => ({
      id: user.id,
      uniqueName: user.uniqueName,
      nickName: user.nickName,
    }));
  }
}
