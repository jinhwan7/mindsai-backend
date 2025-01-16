import { User } from '../../domain/user';
import { UserListParam } from '../../dto/user-list/user-list.param';

export interface UserListInboundPort {
  execute(userListParam: UserListParam): Promise<User[]>;
}
