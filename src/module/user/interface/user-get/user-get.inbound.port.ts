import { User } from '../../domain/user';

export interface UserGetInboundPort {
  execute(id: number): Promise<User>;
}
