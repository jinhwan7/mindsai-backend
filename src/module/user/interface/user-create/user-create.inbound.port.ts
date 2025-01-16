import { User } from '../../domain/user';
import { UserCreateParam } from '../../dto/user-create/user-create.param';

export interface UserCreateInboundPort {
  execute(userCreateParam: UserCreateParam): Promise<User>;
}
