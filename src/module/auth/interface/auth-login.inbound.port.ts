import { AuthToken } from '../domain/authToken';
import { AuthLoginRequest } from '../dto/auth-login.request';

export interface AuthLoginInboundPort {
  execute(authLoginRequest: AuthLoginRequest): Promise<AuthToken>;
}
