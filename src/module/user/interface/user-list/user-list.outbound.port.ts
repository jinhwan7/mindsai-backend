import { User } from '../../domain/user';
import { UserListQuery } from '../../dto/user-list/user-list.query';

export interface UserListOutboundPort {
  execute(userListquery?: UserListQuery): Promise<User[]>;
}
