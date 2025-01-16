import { Test, TestingModule } from '@nestjs/testing';
import { UserListService } from '../user-list.service';
import { USER_DI_TOKEN } from '../../constant/user.di-token.constant';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../domain/user';
import { UserListParam } from '../../dto/user-list/user-list.param';

describe('UserListService', () => {
  let service: UserListService;
  let mockUserListOutboundPort: jest.Mocked<any>;

  const mockUsers: User[] = [
    User.from({
      id: 1,
      uniqueName: 'testUser1',
      nickName: 'TestUser1',
      password: 'hashedPassword1',
    }),
    User.from({
      id: 2,
      uniqueName: 'testUser2',
      nickName: 'Test User2',
      password: 'hashedPassword2',
    }),
  ];

  beforeEach(async () => {
    mockUserListOutboundPort = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserListService,
        {
          provide: USER_DI_TOKEN.USER_LIST_OUTBOUND_PORT,
          useValue: mockUserListOutboundPort,
        },
      ],
    }).compile();

    service = module.get<UserListService>(UserListService);
  });

  describe('execute', () => {
    const userListParam = new UserListParam({
      uniqueName: 'testUser',
      nickName: 'Test User',
    });

    it('유저 목록 조회 성공', async () => {
      mockUserListOutboundPort.execute.mockResolvedValue(mockUsers);

      const result = await service.execute(userListParam);

      expect(mockUserListOutboundPort.execute).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });

    it('유저가 없으면 NotFoundException', async () => {
      const error = new NotFoundException();

      mockUserListOutboundPort.execute.mockRejectedValue(error);

      await expect(service.execute(userListParam)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('예외처리안된 나머지 에러는 InternalServerErrorException처리', async () => {
      mockUserListOutboundPort.execute.mockRejectedValue(new Error());

      await expect(service.execute(userListParam)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('User[] 타입을 리턴해줘야함', async () => {
      mockUserListOutboundPort.execute.mockResolvedValue(mockUsers);

      const result = await service.execute(userListParam);

      expect(Array.isArray(result)).toBeTruthy();
      result.forEach((user) => {
        expect(user).toBeInstanceOf(User);
      });
    });
  });
});
