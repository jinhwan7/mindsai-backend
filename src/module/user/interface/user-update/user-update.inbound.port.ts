import { User } from '../../domain/user';
import { UserUpdateParam } from '../../dto/user-update/user-update.param';

export interface UserUpdateInboundPort {
  execute(userUpdateParam: UserUpdateParam): Promise<User>;
}
