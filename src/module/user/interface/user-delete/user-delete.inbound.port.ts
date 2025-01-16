import { User } from '../../domain/user';

export interface UserDeleteInboundPort {
  execute(id: number): Promise<User>;
}
