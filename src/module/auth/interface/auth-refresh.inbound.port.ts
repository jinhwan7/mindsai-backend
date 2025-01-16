import { AuthToken } from '../domain/authToken';

export interface AuthRefreshInboundPort {
  execute(refreshToken: string): Promise<AuthToken>;
}
