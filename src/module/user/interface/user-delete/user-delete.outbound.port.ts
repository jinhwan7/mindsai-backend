import { User } from '../../domain/user';

export interface UserDeleteOutboundPort {
  execute(id: number): Promise<User>;
}
