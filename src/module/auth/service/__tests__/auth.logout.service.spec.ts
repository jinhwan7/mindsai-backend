import { Test, TestingModule } from '@nestjs/testing';
import { AuthLogoutService } from '../auth.logout.service';
import { USER_DI_TOKEN } from 'src/module/user/constant/user.di-token.constant';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/module/user/domain/user';

describe('AuthLogoutService', () => {
  let service: AuthLogoutService;
  let mockUserUpdateOutboundPort: jest.Mocked<any>;
  let mockUserGetOutboundPort: jest.Mocked<any>;

  const mockUser = User.from({
    id: 1,
    uniqueName: 'testUser',
    nickName: 'Test User',
    password: 'hashedPassword',
    refreshToken: 'old-refresh-token',
  });

  beforeEach(async () => {
    mockUserGetOutboundPort = {
      execute: jest.fn(),
    };

    mockUserUpdateOutboundPort = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthLogoutService,
        {
          provide: USER_DI_TOKEN.USER_UPDATE_OUTBOUND_PORT,
          useValue: mockUserUpdateOutboundPort,
        },
        {
          provide: USER_DI_TOKEN.USER_GET_OUTBOUND_PORT,
          useValue: mockUserGetOutboundPort,
        },
      ],
    }).compile();

    service = module.get<AuthLogoutService>(AuthLogoutService);
  });

  describe('execute', () => {
    const userId = 1;

    it('로그아웃 성공', async () => {
      mockUserGetOutboundPort.execute.mockResolvedValue(mockUser);
      mockUserUpdateOutboundPort.execute.mockResolvedValue({
        ...mockUser,
        refreshToken: null,
      });

      await service.execute(userId);

      expect(mockUserGetOutboundPort.execute).toHaveBeenCalledWith(userId);
      expect(mockUserUpdateOutboundPort.execute).toHaveBeenCalled();

      const updateCall = mockUserUpdateOutboundPort.execute.mock.calls[0][0];
      expect(updateCall.data.refreshToken).toBeNull();
    });

    it('유저가 없으면 NotFoundException', async () => {
      const error = new NotFoundException();

      mockUserGetOutboundPort.execute.mockRejectedValue(error);

      await expect(service.execute(userId)).rejects.toThrow(NotFoundException);
    });

    it('예외처리안된 나머지 에러는 InternalServerErrorException처리', async () => {
      mockUserGetOutboundPort.execute.mockRejectedValue(new Error());

      await expect(service.execute(userId)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
