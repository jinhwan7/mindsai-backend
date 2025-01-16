import { User } from '../../domain/user';

export interface UserGetOutboundPort {
  execute(id: number): Promise<User>;
}
