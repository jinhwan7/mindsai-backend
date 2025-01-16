import { User } from '../domain/user';

export const mockUser: User = User.from({
  id: 1,
  uniqueName: 'testUser',
  nickName: 'TestUser',
  password: 'hashedPassword',
  refreshToken: '',
});
