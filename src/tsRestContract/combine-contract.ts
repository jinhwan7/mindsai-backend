import { authApi } from './auth/auth.contract';
import { c } from './initContract';
import { userApi } from './user/user.contract';

export const combineContract = c.router({
  auth: authApi,
  user: userApi,
});
